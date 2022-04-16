import { ThemeToggle } from './ThemeToggle'

export const Header = ({ theme, toggleTheme }) => {
  return (
    <header className="flex items-center justify-between flex-wrap bg-gray-900 p-4">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        <span className="font-semibold text-xl tracking-tight">Spinach 🌱</span>
      </div>
    </header>
  )
}
