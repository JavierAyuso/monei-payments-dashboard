import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { LayoutDashboard, CreditCard, Menu, X, Sun, Moon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/hooks/useTheme'
import { t } from '@/lib/i18n'
import moneiLogo from '@/assets/monei-logo-color.svg'

const links = [
  { to: '/', label: t.nav.dashboard, icon: LayoutDashboard },
  { to: '/payments', label: t.nav.payments, icon: CreditCard },
]

function NavLinks({ onClick }: { onClick?: () => void }) {
  return (
    <nav className="flex flex-col gap-2">
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
  const { isDark, toggle } = useTheme()

  const themeLabel = isDark ? t.nav.lightMode : t.nav.darkMode
  const ThemeIcon = isDark ? Sun : Moon

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex h-screen w-44 flex-col bg-card px-3 py-6">
        <img src={moneiLogo} alt="MONEI" className="h-4 mb-10 mt-2" />
        <NavLinks />
        <div className="mt-auto">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggle}
            className="w-full justify-start gap-3 text-muted-foreground"
          >
            <ThemeIcon className="h-4 w-4" />
            {themeLabel}
          </Button>
        </div>
      </aside>

      {/* Mobile header */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-40 flex h-14 items-center justify-between bg-card px-4">
        <img src={moneiLogo} alt="MONEI" className="h-5" />
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={toggle}>
            <ThemeIcon className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => setOpen(true)}>
            <Menu className="h-5 w-5" />
          </Button>
        </div>
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
          <img src={moneiLogo} alt="MONEI" className="h-5" />
          <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <NavLinks onClick={() => setOpen(false)} />
      </div>
    </>
  )
}
