export default async function handler(req, res) {
  try {
    const url = process.env.BACKEND || 'http://localhost:3001'
    const request = await fetch(`${url}/create-room`)
    const response = await request.json()
    res.status(200).json(response)
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
}
