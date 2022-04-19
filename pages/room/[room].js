import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { useTheme } from 'next-themes'
import io from 'socket.io-client'
import { Button, Card, Header } from '../../components'
import styles from '../../styles/Home.module.css'

export default function Room() {
  const [mode, setMode] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [socket, setSocket] = useState(null)
  const [connection, setConnection] = useState(null)
  const [roomState, setRoomState] = useState(null)
  const router = useRouter()
  const { room, name } = router.query

  const { theme, setTheme } = useTheme()

  useEffect(() => {
    console.log('SET UP SOCKET STUFF')
    const newSocket = io('http://localhost:3001')
    setSocket(newSocket)

    newSocket.on('connect', () => {
      console.log('connected')
      newSocket.emit('join_room', { room, name }, (props) => console.log(props))
    })

    newSocket.on('room_state', (props) => {
      console.log('room_state', props)
      setRoomState(props)
    })

    return () => newSocket.close()
  }, [setSocket, room, name])

  // useEffect(() => console.log(connection), [connection])

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  return (
    <div>
      <Header theme={theme} toggleTheme={() => setTheme(theme === 'dark' ? 'light' : 'dark')} />

      {room && name && socket && roomState && (
        // tailwind flex container centred column with padding
        <div className="flex flex-col items-center gap-8 mt-8">
          <h1 className="text-6xl">{`Room: ${room}`}</h1>
          <Button onClick={() => socket.emit('ready', { room, id: user.id })} className="max-w-xs">
            {user.ready ? 'Not Ready' : 'Ready'}
          </Button>

          {roomState &&
            roomState.users &&
            roomState.users.map((user) => (
              <Card key={user.id} className="w-full">
                <h2>{user.name}</h2>
                <p>{user.id}</p>
              </Card>
            ))}
        </div>
      )}
    </div>
  )
}
