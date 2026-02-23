import express from "express"
import puppeteer from "puppeteer-core"
import nodemailer from "nodemailer"
import cors from "cors"
import dotenv from "dotenv"
import { createClient } from "@supabase/supabase-js"

dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())

/* ------------------ SUPABASE ------------------ */

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE
)

/* ------------------ EMAIL ------------------ */

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
})

/* ------------------ GENERATE CERTIFICATE ------------------ */

app.post("/generate-certificate/:certificateId", async (req, res) => {
  try {
    const { certificateId } = req.params

    /* 1️⃣ Fetch Certificate with Intern */
    const { data: certificate, error } = await supabase
      .from("certificates")
      .select("*, interns(*)")
      .eq("id", certificateId)
      .single()

    if (error || !certificate) {
      return res.status(404).json({ error: "Certificate not found" })
    }

    const intern = certificate.interns
    const referenceNumber = certificate.reference_number

    /* 2️⃣ Professional Certificate Template */

    const html = `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<style>

@page {
  size: A4 landscape;
  margin: 0;
}

html, body {
  margin: 0;
  padding: 0;
}

body {
  width: 1123px;
  height: 794px;
  font-family: "Times New Roman", serif;
  background: #f8f9fb;
}

.certificate {
  width: 1123px;
  height: 794px;
  box-sizing: border-box;
  padding: 50px;
  border: 12px solid #1f4e79;
  background: white;
}

.inner {
  position: relative;
  width: 100%;
  height: 100%;
  border: 3px solid #c9a227;
  padding: 60px 80px 160px 80px;
  text-align: center;
  box-sizing: border-box;
}

.company-name {
  font-size: 22px;
  font-weight: bold;
  letter-spacing: 2px;
  color: #1f4e79;
}

.gold-line {
  width: 120px;
  height: 3px;
  background: #c9a227;
  margin: 15px auto 40px auto;
}

.title {
  font-size: 42px;
  color: #1f4e79;
  letter-spacing: 3px;
  margin-bottom: 30px;
}

.subtitle {
  font-size: 18px;
  margin-bottom: 15px;
}

.name {
  font-size: 36px;
  font-weight: bold;
  color: #000;
  margin: 20px 0;
  text-transform: uppercase;
}

.description {
  font-size: 18px;
  line-height: 1.8;
  margin: 20px 0;
}

.highlight {
  font-weight: bold;
  color: #1f4e79;
}

.footer {
  position: absolute;
  bottom: 60px;
  left: 80px;
  right: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
}

.signature {
  text-align: left;
}

.signature-line {
  width: 200px;
  border-top: 1px solid #000;
  margin-bottom: 5px;
}

.ref-box {
  text-align: right;
}

</style>
</head>

<body>
  <div class="certificate">
    <div class="inner">

      <div class="company-name">
        YOUR COMPANY NAME
      </div>

      <div class="gold-line"></div>

      <div class="title">CERTIFICATE OF INTERNSHIP</div>

      <div class="subtitle">This is to certify that</div>

      <div class="name">${intern.name}</div>

      <div class="description">
        has successfully completed an internship in the domain of 
        <span class="highlight">${intern.domain}</span>
        from <span class="highlight">${intern.start_date}</span>
        for a duration of 
        <span class="highlight">${intern.duration} Months</span>.
      </div>

      <div class="description">
        During the internship period, the intern demonstrated
        dedication, professionalism, and strong technical skills.
        We wish them great success in their future endeavors.
      </div>

      <div class="footer">
        <div class="signature">
          <div class="signature-line"></div>
          Authorized Signatory
        </div>

        <div class="ref-box">
          <strong>Reference No:</strong> ${referenceNumber}<br/>
          <strong>Issue Date:</strong> ${new Date().toISOString().split("T")[0]}
        </div>
      </div>

    </div>
  </div>
</body>
</html>
`

    /* 3️⃣ Launch Browser */

    const browser = await puppeteer.launch({
      executablePath:
        "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
      headless: "new",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    })

    const page = await browser.newPage()
    await page.setContent(html, { waitUntil: "networkidle0" })

    /* 4️⃣ Generate PDF (KEEPING YOUR SIZE SAME) */

    const pdf = await page.pdf({
      width: "400px",
      height: "500px",
      landscape: true,
      printBackground: true,
      margin: {
        top: "0px",
        bottom: "0px",
        left: "0px",
        right: "0px",
      },
    })

    await browser.close()

    /* 5️⃣ Upload to Supabase Storage */

    const fileName = `certificate-${certificateId}.pdf`

    const { error: uploadError } = await supabase.storage
      .from("certificates")
      .upload(fileName, pdf, {
        contentType: "application/pdf",
        upsert: true,
      })

    if (uploadError) {
      return res.status(500).json({ error: "Upload failed" })
    }

    const { data: publicUrl } = supabase.storage
      .from("certificates")
      .getPublicUrl(fileName)

    /* 6️⃣ UPDATE Existing Certificate (NO INSERT) */

    await supabase
      .from("certificates")
      .update({
        pdf_url: publicUrl.publicUrl,
        status: "sent",
      })
      .eq("id", certificateId)

    /* 7️⃣ Send Email */

    await transporter.sendMail({
      from: `"Internship Team" <${process.env.EMAIL}>`,
      to: intern.email,
      subject: "Your Internship Certificate 🎉",
      text: `Congratulations ${intern.name}! Your certificate reference number is ${referenceNumber}.`,
      attachments: [
        {
          filename: `Certificate-${intern.name}.pdf`,
          content: pdf,
        },
      ],
    })

    return res.json({
      success: true,
      downloadUrl: publicUrl.publicUrl,
    })

  } catch (error) {
    console.error("Server Error:", error)
    return res.status(500).json({ error: "Internal Server Error" })
  }
})

/* ------------------ START SERVER ------------------ */

app.listen(5000, () => {
  console.log("✅ Server running on http://localhost:5000")
})

