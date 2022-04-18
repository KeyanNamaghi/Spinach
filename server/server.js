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

  socket.on('join_room', ({ room }) => {
    socket.join(room)
    console.log(`User Joined Room: ${room}`)

    if (!rooms[room]) {
      // Create a new room if it doesn't exist
      rooms[room] = {
        users: []
      }
    }

    if (!rooms[room].users.some((el) => el.id === socket.id)) {
      rooms[room].users.push({ id: socket.id, ready: false })
      console.log(`User ${socket.id} added to room: ${room}`)
    }

    console.log('Users in Room: ', rooms[room].users)
  })

  socket.on('send_message', (data) => {
    // socket.to(data.room).emit('receive_message', data)
    socket.broadcast.emit('send_message', data)
  })
})

server.listen(3001, () => {
  console.log('SERVER IS RUNNING ON PORT 3001 🏃‍♂️')
})
