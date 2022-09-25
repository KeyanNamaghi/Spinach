import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { getCookie } from 'cookies-next'
import { Formik } from 'formik'
import { set, ref, onValue, remove, update } from 'firebase/database'
import { database } from '../firebase'
import { formatInputText } from '../utils'
import { Button, Card, Input } from '.'

export const CreateRoom = ({ toggleShow }) => {
  const router = useRouter()
  const nameCookie = getCookie('user_name') ?? ''

  useEffect(() => {
    onValue(ref(database, '/'), (snapshot) => {
      const data = snapshot.val()
      console.log({ data })
      // if (data !== null) {
      //   setIngredients(data.ingredients)
      //   setSides(data.sides)
      // }
    })
  }, [])

  return (
    <Card>
      <Formik
        initialValues={{ name: nameCookie, password: '' }}
        onSubmit={async ({ name, password }, actions) => {
          try {
            const request = await fetch(`/api/create`)
            const response = await request.json()

            if (response?.room) {
              router.push({
                pathname: `/room/${response.room}`,
                query: { name }
              })
            }
          } catch (error) {
            actions.setErrors({
              submit: 'Something went wrong 😬'
            })

            console.log(error)
          }

          actions.setSubmitting(false)
        }}
        validate={(values) => {
          const errors = {}
          if (!values.name) {
            errors.name = 'Name required'
          }
          return errors
        }}
      >
        {({ values, errors, isValid, isSubmitting, dirty, handleSubmit, handleBlur, handleChange, setFieldValue }) => (
          <form onSubmit={handleSubmit} className="space-y-6">
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
              placeholder="Optional: Enter a password"
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="off"
            />
            {errors.submit && <div>{errors.submit}</div>}
            <Button type="submit" disabled={!isValid || !dirty || isSubmitting} value="Create" />
            <Button type="button" onClick={toggleShow} value="Join existing game" />
          </form>
        )}
      </Formik>
    </Card>
  )
}
