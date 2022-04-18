import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useTheme } from 'next-themes'
import { CreateRoom, Header, JoinRoom } from '../components'
import styles from '../styles/Home.module.css'

export default function Home() {
  const [mode, setMode] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  return (
    <div className={styles.container}>
      <Header theme={theme} toggleTheme={() => setTheme(theme === 'dark' ? 'light' : 'dark')} />

      <main className={`${styles.main} ${mode ? styles.mainToggled : ''}`}>
        <JoinRoom toggleShow={() => setMode(true)} />
        <CreateRoom toggleShow={() => setMode(false)} />
        <div className={`${styles.imageContainer} ${mode ? styles.imageContainerAnimated : ''}`}>
          <Image
            src="/Spinach.webp"
            alt="hero"
            layout="fill"
            objectFit="cover"
            placeholder="blur"
            blurDataURL="data:image/webp;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88/frfwAJmgPfIAPobgAAAABJRU5ErkJggg=="
            priority
          />
        </div>
      </main>
    </div>
  )
}
