import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { LayoutDashboard, CreditCard, Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import moneiLogo from '@/assets/monei-logo-color.svg'
import { Button } from '@/components/ui/button'

const links = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/payments', label: 'Pagos', icon: CreditCard },
]

function NavLinks({ onClick }: { onClick?: () => void }) {
  return (
    <nav className="flex flex-col gap-1">
      {links.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          end
          onClick={onClick}
          className={({ isActive }) =>
            cn(
              'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
              isActive
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
            )
          }
        >
          <Icon className="h-4 w-4 shrink-0" />
          {label}
        </NavLink>
      ))}
    </nav>
  )
}

export function Sidebar() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex h-screen w-44 flex-col border-r bg-card px-3 py-6">
        <img src={moneiLogo} alt="MONEI" className="mb-8 h-4" />
        <NavLinks />
      </aside>

      {/* Mobile header */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-40 flex h-14 items-center justify-between border-b bg-card px-4">
        <img src={moneiLogo} alt="MONEI" className="h-4" />
        <Button variant="ghost" size="icon" onClick={() => setOpen(true)}>
          <Menu className="h-5 w-5" />
        </Button>
      </header>

      {/* Mobile drawer overlay */}
      {open && (
        <div className="md:hidden fixed inset-0 z-40 bg-black/50" onClick={() => setOpen(false)} />
      )}

      {/* Mobile drawer */}
      <div
        className={cn(
          'md:hidden fixed top-0 left-0 z-50 h-full w-56 bg-card px-3 py-6 shadow-lg transition-transform duration-200',
          open ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="mb-8 flex items-center justify-between px-3">
          <p className="text-lg font-bold tracking-tight">MONEI</p>
          <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <NavLinks onClick={() => setOpen(false)} />
      </div>
    </>
  )
}
