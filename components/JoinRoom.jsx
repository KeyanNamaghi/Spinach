import { Formik } from 'formik'
import Image from 'next/image'
import { Button, Card, Input } from '.'
import { formatInputText } from '../utils'

export const JoinRoom = ({ toggleShow }) => {
  return (
    <Card>
      <Formik
        initialValues={{ name: '', code: '' }}
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
          if (!values.code) {
            errors.code = 'Code required'
          } else if (values.code.length !== 4) {
            errors.code = 'Code must be 4 characters'
          }
          return errors
        }}
      >
        {({ values, isValid, dirty, handleSubmit, handleBlur, handleChange, setFieldValue }) => (
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
                autocomplete="off"
              />
              <Input
                required
                placeholder="Enter the 4 letter room code"
                maxLength={4}
                name="code"
                value={values.code}
                onChange={(e) => setFieldValue('code', formatInputText(e.target.value))}
                onBlur={handleBlur}
                autocomplete="off"
              />
              <Button type="submit" disabled={!isValid || !dirty} value="Join" />
              <Button type="button" onClick={toggleShow} value="Create new game" />
            </form>
          </>
        )}
      </Formik>
    </Card>
  )
}
