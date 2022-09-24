import { useRouter } from 'next/router'
import { Formik } from 'formik'
import { Button, Card, Input } from '.'
import { formatInputText } from '../utils'
import { getCookie } from 'cookies-next'

export const CreateRoom = ({ toggleShow }) => {
  const router = useRouter()
  const nameCookie = getCookie('user_name') ?? ''

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
