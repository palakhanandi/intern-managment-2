export default function DashboardCard({ icon: Icon, title, description }) {
  return (
    <div className="rounded-xl border bg-background p-6 shadow-sm hover:shadow-md transition">
      <Icon className="mb-4 h-10 w-10 text-primary" />
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        {description}
      </p>
    </div>
  )
}
