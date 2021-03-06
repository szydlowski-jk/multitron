path = require('path')

const PORT = process.env.PORT || 5000
const INDEX = path.join(__dirname, 'index.html')

express = require('express')

const server = express()
  .use((req, res) => res.sendFile(INDEX) )
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

const io = require('socket.io')(server)

tron = require('./trongame')
const MAX_PLAYER_CONNECTIONS = 8
const MAX_CONNECTIONS = 16
let connections = 0

let game
let playersid = {}

io.on('connection', socket => {
    console.log(`New connection [${socket.id}] #${connections+1}`)
    if (connections+1 < MAX_CONNECTIONS) {
        connections++
        if (connections < MAX_PLAYER_CONNECTIONS) {
            socket.emit(
                'connection',
                connections
            )
            playersid[socket.id] = connections
            game = new tron.TronGame(connections)
            io.emit('state', game.state)
        } else {
            socket.emit(
                'connection',
                'Connected to MultiTronServer as spectator'
            )
        }
    } else {
        socket.emit(
            'connection',
            'Connection limit reached'
        )
    }

    socket.on('disconnect', () => {
        console.log(`${[socket.id]} disconnected}`)
        connections--
        game = new tron.TronGame(connections)
        io.emit('state', game.state)
    })

    socket.on('update', data => {
        let id = playersid[socket.id] - 1
        game.state.players[id].x = data.x
        game.state.players[id].y = data.y
        io.emit('state', game.state)
    })
})



