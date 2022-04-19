const express = require('express')
const app = express()
const http = require('http')
const { Server } = require('socket.io')
const cors = require('cors')

app.use(cors())

const server = http.createServer(app)

const rooms = {}

// generate a code for the room (4 letters), could be improved
const generateCode = () => {
  // generate 4 capital letter room code
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const room = Array.from({ length: 4 }, () => letters[Math.floor(Math.random() * letters.length)]).join('')

  if (rooms[room]) {
    // lmao what are the chances?
    return generateCode()
  } else {
    return room
  }
}

// iterate through rooms and return an array of room objects
const cleanUpRooms = () => {
  Object.keys(rooms)
    .filter((room) => {
      // filter out rooms that were last updated more than an hour ago
      const lastUpdated = new Date(rooms[room]?.lastUpdated)
      const now = new Date()
      const diff = now.getTime() - lastUpdated.getTime()
      return diff > 3600000
    })
    .forEach((roomToDelete) => {
      // delete rooms that were created more than an hour ago
      delete rooms[roomToDelete]
    })
}

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
})

io.on('connection', (socket) => {
  console.log(`User Connected: ${socket.id}`)

  socket.on('join_room', ({ name, room }, callback) => {
    if (!rooms[room]) {
      // message user telling them that the room doesn't exist
      callback({ connected: false, error: 'Room does not exist' })
    } else if (!rooms[room]?.users?.some((el) => el.id === socket.id)) {
      // add user to room if they don't exist in the room
      socket.join(room)
      rooms[room].users.push({ id: socket.id, name, ready: false })
      callback({ connected: true, error: '' })
      console.log(`User ${socket.id} added to room: ${room}`)

      // broadcast to all users in the room the state of the room
      io.to(room).emit('room_state', rooms[room])
    }

    console.log('Users in Room: ', rooms[room]?.users)
  })

  socket.on('create_room', ({ name, password }, callback) => {
    const roomCode = generateCode()
    rooms[roomCode] = {
      users: [{ id: socket.id, name, ready: false }],
      password
    }

    callback({ connected: true, error: '', room: roomCode })
    console.log(`User ${socket.id} created room: ${roomCode}`)
  })

  socket.on('disconnect', () => {
    console.log('DISCONNECTED')

    Object.keys(rooms).forEach((room) => {
      console.log('On Disconnect: ', rooms[room])
      if (rooms[room].users.some((el) => el.id === socket.id)) {
        // remove user from room
        rooms[room].users = rooms[room]?.users.filter((user) => user.id !== socket.id)
        console.log(`User ${socket.id} disconnected from room: ${room}`)
        io.to(room).emit('room_state', rooms[room])
      }
    })
  })
})

app.get('/rooms', function (req, res) {
  cleanUpRooms()
  res.send(rooms)
})

app.get('/validate-room', function (req, res) {
  const { room } = req.query

  if (!room) {
    // If no room is provided, return a bad request error
    res.statusCode = 401
    res.send({ valid: false })
  } else if (rooms[room]) {
    // If the room exists, return a valid response
    res.send({ valid: true })
  } else {
    // If the room doesn't exist, return an invalid response
    res.statusCode = 404
    res.send({ valid: false })
  }
})

app.get('/create-room', function (req, res) {
  const { password } = req.query
  cleanUpRooms()
  const roomCode = generateCode()
  const now = new Date()

  rooms[roomCode] = {
    users: [],
    password,
    created: now,
    lastUpdated: now
  }
  res.send({ room: roomCode })
})

server.listen(3001, () => {
  console.log('SERVER IS RUNNING ON PORT 3001 🏃‍♂️')
})
