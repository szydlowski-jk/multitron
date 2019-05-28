class TronGame {
    constructor (players) {
        console.log('New game: ', players)
        this.state = {}
        this.state.players = []

        for (let pl = 0; pl < players; pl++) {
            let p = {}
            p.x = 0.1 + pl * 0.1
            p.y = 0.5
            console.log(`new player ${p}`)
            this.state.players.push(p)
        }
    }

    update () {

    }
}

module.exports = {
    TronGame: TronGame
}