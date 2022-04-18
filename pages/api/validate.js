export default async function handler(req, res) {
  const { room } = req.query

  try {
    const request = await fetch(`http://localhost:3001/validate-room?room=${room}`)
    const response = await request.json()
    res.status(200).json(response)
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
}
