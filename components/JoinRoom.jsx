import Image from 'next/image'
import { Button, Card, Input } from '.'

export const JoinRoom = ({ toggleShow }) => {
  return (
    <Card>
      <Image src="/SpinachIcon.png" alt="brand logo" height={200} width={200} />
      <form className="space-y-6 mt-6" action="#">
        <Input required placeholder="Enter your name" maxLength={16} pattern={'[A-Za-z]'} />
        <Input placeholder="Enter the 4 letter room code" maxLength={4} />
        <Button type="submit" disabled={true} value="Join" />
        <Button type="button" onClick={toggleShow} value="Create new game" />
      </form>
    </Card>
  )
}
