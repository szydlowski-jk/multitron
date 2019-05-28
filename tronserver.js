const io = require('socket.io')(3000)
const MAX_PLAYER_CONNECTIONS = 8
const MAX_CONNECTIONS = 16
let connections = 0

io.on('connection', socket => {
    if (connections+1 < MAX_CONNECTIONS) {
        connections++
        if (connections < MAX_PLAYER_CONNECTIONS) {
            socket.emit('debug-data', `Connected to MultiTronServer as player (${connections} / ${MAX_PLAYER_CONNECTIONS})`)
        }

    }
})
