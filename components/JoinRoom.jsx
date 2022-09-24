import Image from 'next/image'
import { useRouter } from 'next/router'
import { Formik } from 'formik'
import { getCookie } from 'cookies-next'
import { Button, Card, Input } from '.'
import { formatInputText } from '../utils'
import { useStateContext } from '../hooks'

export const JoinRoom = ({ toggleShow }) => {
  const router = useRouter()
  const { name } = useStateContext()

  return (
    <Card>
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
