export const testGameData = {
    numPlayers: 4,
    player1: {
        name: 'player1',
        race: 'race1',
        score: 3
    },
    player2: {
        name: 'player2',
        race: 'race2',
        score: 10
    },
    player3: {
        name: 'player3',
        race: 'race3',
        score: 6
    },
    player4: {
        name: 'player4',
        race: 'race4',
        score: 9
    },
    winner: 'player2'
}

export const testGameDataNoWinner = {
    numPlayers: 4,
    player1: {
        name: 'player1',
        race: 'race1',
        score: 3
    },
    player2: {
        name: 'player2',
        race: 'race2',
        score: 9
    },
    player3: {
        name: 'player3',
        race: 'race3',
        score: 6
    },
    player4: {
        name: 'player4',
        race: 'race4',
        score: 9
    },
    winner: ''
}

export const testGameDataMultipleWinners = {
    numPlayers: 4,
    player1: {
        name: 'player1',
        race: 'race1',
        score: 10
    },
    player2: {
        name: 'player2',
        race: 'race2',
        score: 10
    },
    player3: {
        name: 'player3',
        race: 'race3',
        score: 6
    },
    player4: {
        name: 'player4',
        race: 'race4',
        score: 9
    },
    winner: ''
}

export const testGameDataBlankNames = {
    numPlayers: 4,
    player1: {
        name: '',
        race: 'race1',
        score: 8
    },
    player2: {
        name: 'player2',
        race: 'race2',
        score: 10
    },
    player3: {
        name: 'player3',
        race: 'race3',
        score: 6
    },
    player4: {
        name: 'player4',
        race: 'race4',
        score: 9
    },
    winner: ''
}

export const testGameDataBlankRaces = {
    numPlayers: 4,
    player1: {
        name: '',
        race: '',
        score: 8
    },
    player2: {
        name: 'player2',
        race: 'race2',
        score: 10
    },
    player3: {
        name: 'player3',
        race: 'race3',
        score: 6
    },
    player4: {
        name: 'player4',
        race: 'race4',
        score: 9
    },
    winner: ''
}