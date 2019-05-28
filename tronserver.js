const PORT = 3000
const INDEX = 'index.html'
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

io.on('connection', socket => {
    console.log(`New connection [${socket.id}] #${connections+1}`)
    if (connections+1 < MAX_CONNECTIONS) {
        connections++
        if (connections < MAX_PLAYER_CONNECTIONS) {
            socket.emit(
                'connection',
                `Connected to MultiTronServer as player (${connections} / ${MAX_PLAYER_CONNECTIONS})`
            )
            game = new tron.TronGame(connections)
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
    })
})



