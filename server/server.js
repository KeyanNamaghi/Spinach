const express = require('express')
const app = express()
const http = require('http')
const { Server } = require('socket.io')
const cors = require('cors')

app.use(cors())

const server = http.createServer(app)

const rooms = {}

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
    }

    console.log('Users in Room: ', rooms[room]?.users)
  })

  socket.on('create_room', ({ name, password }, callback) => {
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

    // create room
    const roomCode = generateCode()
    rooms[roomCode] = {
      users: [{ id: socket.id, name, ready: false }],
      password
    }

    callback({ connected: true, error: '', room: roomCode })
    console.log(`User ${socket.id} created room: ${roomCode}`)
  })

  socket.on('send_message', (data) => {
    // socket.to(data.room).emit('receive_message', data)
    socket.broadcast.emit('send_message', data)
  })
})

app.get('/rooms', function (req, res) {
  res.send(rooms)
})

server.listen(3001, () => {
  console.log('SERVER IS RUNNING ON PORT 3001 🏃‍♂️')
})
