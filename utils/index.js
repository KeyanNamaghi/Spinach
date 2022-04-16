export const isBrowser = typeof window !== 'undefined'

export const formatInputText = (value) => {
  const onlyLetters = value.replace(/[^A-Za-z]/gi, '')
  return onlyLetters.toUpperCase()
}
