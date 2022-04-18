import { useState, useEffect } from 'react'
import Head from 'next/head'
import { useTheme } from 'next-themes'
import io from 'socket.io-client'
import { Header } from '../../components'
import styles from '../../styles/Home.module.css'

export default function Room() {
  const [mode, setMode] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [socket, setSocket] = useState(null)
  const [connection, setConnection] = useState(null)

  const { theme, setTheme } = useTheme()

  useEffect(() => {
    const newSocket = io('http://localhost:3001')
    setSocket(newSocket)
    newSocket.on('connect', () => {
      console.log('connected')
    })
    return () => newSocket.close()
  }, [setSocket])

  useEffect(() => console.log(connection), [connection])

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  return (
    <div>
      <Header theme={theme} toggleTheme={() => setTheme(theme === 'dark' ? 'light' : 'dark')} />

      <h1>Room</h1>
    </div>
  )
}
