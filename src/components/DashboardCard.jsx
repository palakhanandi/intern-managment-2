import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function DashboardCard({ icon: Icon, title, description }) {
  return (
    <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
      <CardHeader>
        <div className="mb-2">
          <Icon className="h-8 w-8 text-primary group-hover:scale-110 transition-transform" />
        </div>
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription className="mt-2">{description}</CardDescription>
      </CardHeader>
    </Card>
  )
}
