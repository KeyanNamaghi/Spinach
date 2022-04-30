import Head from 'next/head'
import { useRouter } from 'next/router'
import { ThemeToggle } from './ThemeToggle'

export const Header = ({ theme, toggleTheme }) => {
  const router = useRouter()

  return (
    <>
      <Head>
        <title>Spinach</title>
        <meta name="description" content="Spinach" />
        <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="flex items-center justify-between flex-wrap bg-gray-900 p-4">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          <span className="font-semibold text-xl tracking-tight" onClick={() => router.push('/')}>
            Spinach 🌱
          </span>
        </div>
      </header>
    </>
  )
}
