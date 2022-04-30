import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useTheme } from 'next-themes'
import io from 'socket.io-client'
import { Button, Card, Header } from '../../components'

export default function Room() {
  const [mounted, setMounted] = useState(false)
  const [socket, setSocket] = useState(null)
  const [roomState, setRoomState] = useState(null)
  const router = useRouter()
  const { room, name } = router.query

  const { theme, setTheme } = useTheme()

  const getSelf = () => {
    if (roomState) {
      return roomState.users.find((user) => user.id === socket.id)
    }
  }

  const self = getSelf()

  useEffect(() => {
    console.log('SET UP SOCKET STUFF')
    const url = process.env.NEXT_PUBLIC_BACKEND || 'http://localhost:3001'
    const newSocket = io(url)
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

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  return (
    <div>
      <Header theme={theme} toggleTheme={() => setTheme(theme === 'dark' ? 'light' : 'dark')} />

      {room && name && socket && roomState && (
        <div className="flex flex-col items-center gap-8 mt-8">
          <h1 className="text-6xl">{`Room: ${room}`}</h1>
          <Button onClick={() => socket.emit('ready', { room, id: self.id, ready: !self.ready })} className="max-w-xs">
            {self?.ready ? 'Ready' : 'Ready up?'}
          </Button>

          {roomState &&
            roomState.users &&
            roomState.users.map((user) => (
              <Card
                key={user.id}
                className={`w-full  ${user.ready ? '!bg-emerald-700 dark:!bg-emerald-600 text-white' : ''}`}
              >
                <h2>{user.name}</h2>
                <p>{user.id}</p>
                <p>{user.ready ? 'Ready' : 'Not Ready'}</p>
              </Card>
            ))}
        </div>
      )}
    </div>
  )
}
