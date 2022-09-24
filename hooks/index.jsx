import React, { useState, createContext, useContext, useEffect, useRef } from 'react'
import { getCookie } from 'cookies-next'
import { v4 as generateId } from 'uuid'

const Context = createContext([{}, () => {}])
const { Provider } = Context

const useStateContext = () => {
  const [state, setState] = useContext(Context)

  return { ...state }
}

const StateProvider = ({ children }) => {
  const idRef = useRef()
  const nameRef = useRef()
  idRef.current = getCookie('user_id') ?? ''
  nameRef.current = getCookie('user_name') ?? ''

  useEffect(() => {
    if (!idRef.current) {
      const id = generateId()
      console.log('Generated ID: ', id)
      document.cookie = `user_id=${id}; path=/`
      idRef.current = id
    }
  }, [])

  const [state, setState] = useState({ name: nameRef, id: idRef })

  return <Provider value={[state, setState]}>{children}</Provider>
}

export { useStateContext, StateProvider }
