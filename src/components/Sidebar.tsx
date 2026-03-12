import { NavLink } from 'react-router-dom'
import { LayoutDashboard, CreditCard } from 'lucide-react'
import { cn } from '@/lib/utils'

const links = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/payments', label: 'Pagos', icon: CreditCard },
]

export function Sidebar() {
  return (
    <aside className="flex h-screen w-56 flex-col border-r bg-card px-3 py-6">
      <p className="mb-8 px-3 text-lg font-bold tracking-tight">MONEI</p>
      <nav className="flex flex-col gap-1">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              )
            }
          >
            <Icon className="h-4 w-4" />
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
