import { Formik } from 'formik'
import { Button, Card, Input } from '.'
import { formatInputText } from '../utils'

export const CreateRoom = ({ toggleShow }) => {
  return (
    <Card>
      <Formik
        initialValues={{ name: '', password: '' }}
        onSubmit={(values, actions) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2))
            actions.setSubmitting(false)
          }, 200)
        }}
        validate={(values) => {
          const errors = {}
          if (!values.name) {
            errors.name = 'Name required'
          }
          return errors
        }}
      >
        {({ values, isValid, dirty, handleSubmit, handleBlur, handleChange, setFieldValue }) => (
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
            <Button type="submit" disabled={!isValid || !dirty} value="Create" />
            <Button type="button" onClick={toggleShow} value="Join existing game" />
          </form>
        )}
      </Formik>
    </Card>
  )
}
