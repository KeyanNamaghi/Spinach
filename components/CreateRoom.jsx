import { Button, Card, Input } from '.'

export const CreateRoom = ({ toggleShow }) => {
  return (
    <Card>
      {/* <Image src="/SpinachIcon.jpg" alt="brand logo" height={200} width={200} /> */}
      <form className="space-y-6" action="#">
        <Input required placeholder="Enter your name" maxLength={16} pattern={'[A-Za-z]'} />
        <Input placeholder="Optional: Enter a password" maxLength={16} />
        <Button type="submit" disabled={true} value="Create" />
        <Button type="button" onClick={toggleShow} value="Join existing game" />
      </form>
    </Card>
  )
}
