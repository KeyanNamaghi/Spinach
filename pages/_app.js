import { ThemeProvider } from 'next-themes'
import { StateProvider } from '../hooks'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system">
      <StateProvider>
        <Component {...pageProps} />
      </StateProvider>
    </ThemeProvider>
  )
}

export default MyApp
