export const isBrowser = typeof window !== 'undefined'

export const formatInputText = (value) => {
  const onlyLetters = value.replace(/[^A-Za-z]/gi, '')
  return onlyLetters.toUpperCase()
}

export const generateId = () => {
  return Math.random().toString(36)
}

export const generateRoomCode = () => {
  let result = ''
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  for (var i = 0; i < 4; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length))
  }
  console.log({ roomCode: result })

  return result
}
