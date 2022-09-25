import { useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { set, ref, onValue, remove, update, get } from 'firebase/database'
import { Formik } from 'formik'
import { Button, Card, Input } from '.'
import { formatInputText, generateRoomCode } from '../utils'
import { useStateContext } from '../hooks'
import { database } from '../firebase'

const fetchRoom = async (code) => {
  get(ref(database, `/${code}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val())
        // TODO: Recycle old rooms
      } else {
        console.log('No data available')
        return
      }
    })
    .catch((error) => {
      console.error(error)
    })
}

export const JoinRoom = ({ toggleShow }) => {
  const router = useRouter()
  const { name } = useStateContext()

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

  return (
    <Card>
      <button
        onClick={() => {
          const roomCode = generateRoomCode()
          try {
            fetchRoom(roomCode).then(() => router.push({ pathname: `/room/${roomCode}` }))
          } catch (error) {
            // TODO: probably should handle this sometime...
          }
        }}
      >
        Click me!
      </button>
      <Formik
        initialValues={{ name: name.current, code: '' }}
        onSubmit={async ({ name, code: room }, actions) => {
          try {
            const request = await fetch(`/api/validate?room=${room}`)
            const response = await request.json()

            if (response?.valid) {
              router.push({
                pathname: `/room/${room}`,
                query: { name }
              })
            } else {
              actions.setErrors({
                submit: 'Invalid room code'
              })
            }
          } catch (error) {
            console.log(error)
            actions.setErrors({
              submit: 'Something went wrong 😬'
            })
          }

          actions.setSubmitting(false)
        }}
        validate={(values) => {
          const errors = {}
          if (!values.name) {
            errors.name = 'Name required'
          }
          if (!values.code) {
            errors.code = 'Code required'
          } else if (values.code.length !== 4) {
            errors.code = 'Code must be 4 characters'
          }
          return errors
        }}
      >
        {({ values, errors, isValid, isSubmitting, dirty, handleSubmit, handleBlur, setFieldValue }) => (
          <>
            <Image src="/SpinachIcon.png" alt="brand logo" height={200} width={200} />
            <form onSubmit={handleSubmit} className="space-y-6 mt-6">
              <Input
                required
                placeholder="Enter your name"
                maxLength={16}
                pattern="[a-zA-Z]+"
                name="name"
                value={values.name}
                onChange={(e) => setFieldValue('name', formatInputText(e.target.value))}
                onBlur={handleBlur}
                autoComplete="off"
              />
              <Input
                required
                placeholder="Enter the 4 letter room code"
                maxLength={4}
                name="code"
                value={values.code}
                onChange={(e) => setFieldValue('code', formatInputText(e.target.value))}
                onBlur={handleBlur}
                autoComplete="off"
              />
              {errors.submit && <div>{errors.submit}</div>}
              <Button type="submit" disabled={!isValid || !dirty || isSubmitting} value="Join" />
              <Button type="button" onClick={toggleShow} value="Create new game" />
            </form>
          </>
        )}
      </Formik>
    </Card>
  )
}
