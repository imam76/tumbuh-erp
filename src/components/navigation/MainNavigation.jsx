import { Link, NavLink } from 'react-router'
import { paths } from '@/routes/paths'

const navLinkClass = ({ isActive }) =>
  [
    'rounded-md px-3 py-2 text-slate-600 no-underline transition-colors',
    'hover:bg-violet-100 hover:text-violet-700',
    'dark:text-slate-300 dark:hover:bg-violet-400/15 dark:hover:text-violet-300',
    isActive && 'bg-violet-100 text-violet-700 dark:bg-violet-400/15 dark:text-violet-300',
  ]
    .filter(Boolean)
    .join(' ')

export function MainNavigation() {
  return (
    <header className="flex items-center justify-between gap-6 border-b border-slate-200 px-8 py-5 dark:border-slate-800 max-[720px]:items-start max-[720px]:flex-col max-[720px]:px-5 max-[720px]:py-[18px]">
      <Link
        className="text-lg font-bold text-slate-950 no-underline dark:text-slate-100"
        to={paths.home}
      >
        Tumbuh ERP
      </Link>
      <nav className="flex items-center gap-2" aria-label="Primary navigation">
        <NavLink className={navLinkClass} to={paths.home} end>
          Home
        </NavLink>
        <NavLink className={navLinkClass} to={paths.dashboard}>
          Dashboard
        </NavLink>
      </nav>
    </header>
  )
}
