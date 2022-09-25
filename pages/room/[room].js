import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useTheme } from 'next-themes'
import { set, ref, onValue, remove, update, get } from 'firebase/database'
import { Button, Card, Header } from '../../components'
import { database } from '../../firebase'

export default function Room() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [roomState, setRoomState] = useState(null)
  const router = useRouter()
  const { room, name } = router.query

  // useEffect(() => {
  //   onValue(ref(database, '/'), (snapshot) => {
  //     const data = snapshot.val()
  //     console.log({ data })
  //     // if (data !== null) {
  //     //   setIngredients(data.ingredients)
  //     //   setSides(data.sides)
  //     // }
  //   })
  // }, [])

  // When mounted on client, now we can show the UI
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    console.log({ room })
    if (room) set(ref(database, `/${room}`), { lastUpdated: Date.now() })
  }, [room])

  if (!mounted) return null

  return (
    <div>
      <Header theme={theme} toggleTheme={() => setTheme(theme === 'dark' ? 'light' : 'dark')} />

      {room && name && roomState && (
        <div className="flex flex-col items-center gap-8 mt-8">
          <h1 className="text-6xl">{`Room: ${room}`}</h1>
          <Button className="max-w-xs">{self?.ready ? 'Ready' : 'Ready up?'}</Button>

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
