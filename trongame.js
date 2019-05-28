class TronGame {
    constructor (players) {
        console.log('New game: ', players)
        this.state = {}
        this.state.players = []

        for (pl in players) {
            let p = {}
            p.x = 0.1 + pl * 0.1
            p.y = 0.5
            console.log(`new player ${p}`)
        }
    }

    update () {

    }
}

module.exports = {
    TronGame: TronGame
}