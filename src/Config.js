
const PROD = 'http://phoenix-rest-api.herokuapp.com';



export const primaryColor = "#296896"
export const secondaryColor = "#4A89B7"
export const darkColor = "#2F4348"


export const Rows = 5;
export const Cols = 5;
export const StartPosition = [4, 0];
export const EndPosition = [0, 4];
export const flags = [[0, 1], [1, 3], [2, 0], [3, 4], [4, 2]];
export const mines = [[0, 3], [1, 1], [2, 4], [3, 2], [4, 3]];
export const noOfTasks = 18

export const taskList1 = [

    {
        title: "Sing a song",
        description: "Player who reached this point has to sing a song, or both the players can singh together.",
        time: "1-2 minutes",

    },
    {
        title: "Treasure hunt",
        description: "The player who reached this point has to find a object, which will be hidden by other player. The finder can take atmost 3 clues from the item hider.",
        time: "1-2 minutes",
    }, {
        title: "Guess a movie",
        description: "The player who reached this point, has to guess a movie. Where actions will be done by other player",
        time: "1-2 minutes",
    }, {
        title: "Complete the song",
        description: "The othe player will sing few lines of the song and the player who reached this point has to complete few next lines of the song.",
        time: "1-2 minutes",
    },
    {
        title: "Tell a joke",
        description: "The player who reached this point has to tell a funny joke to other player.",
        time: "1-2 minutes",
    },

    {
        title: "Tell about the best movie scene",
        description: "The player who reached this point has to tell about their favorite movie scene to other player.",
        time: "1-2 minutes",
    },
    {
        title: "Tell the truth",
        description: "Other player will ask a question to player who reached this point and player has to tell the truth.",
        time: "1-2 minutes",
    },
    {
        title: "Massage",
        description: "Player who reached this point has to do a 1 minute neck/head massage to other player.",
        time: "1 minute",
    },
    {
        title: "Tell real life funny incident",
        description: "Player who reached this point has to tell about a funny incident that happened to them in their past.",
        time: "2-3 minutes",
    }, {
        title: "Complete a dare",
        description: "Other player will give a small dare to player who reached this point and player has to complete that.",
        time: "2-3 minutes",
    }
    , {
        title: "Sing a song",
        description: "Player who reached this point has to sing a song, or both the players can singh together.",
        time: "1-2 minutes",

    },
    {
        title: "Treasure hunt",
        description: "The player who reached this point has to find a object, which will be hidden by other player. The finder can take atmost 3 clues from the item hider.",
        time: "1-2 minutes",
    }, {
        title: "Guess a movie",
        description: "The player who reached this point, has to guess a movie. Where actions will be done by other player",
        time: "1-2 minutes",
    }, {
        title: "Complete the song",
        description: "The othe player will sing few lines of the song and the player who reached this point has to complete few next lines of the song.",
        time: "1-2 minutes",
    },
    {
        title: "Tell a joke",
        description: "The player who reached this point has to tell a funny joke to other player.",
        time: "1-2 minutes",
    },

    {
        title: "Tell about the best movie scene",
        description: "The player who reached this point has to tell about their favorite movie scene to other player.",
        time: "1-2 minutes",
    },
    {
        title: "Tell the truth",
        description: "Other player will ask a question to player who reached this point and player has to tell the truth.",
        time: "1-2 minutes",
    },
    {
        title: "Massage",
        description: "Player who reached this point has to do a 1 minute neck/head massage to other player.",
        time: "1 minute",
    },
    {
        title: "Tell real life funny incident",
        description: "Player who reached this point has to tell about a funny incident that happened to them in their past.",
        time: "2-3 minutes",
    }, {
        title: "Complete a dare",
        description: "Other player will give a small dare to player who reached this point and player has to complete that.",
        time: "2-3 minutes",
    }

]


export const avatars = [
    [{
        id: 1,
        avatar: "cat"
    }, {
        id: 2,
        avatar: "panda"
    }],
    [{
        id: 3,
        avatar: "pig"
    }, {
        id: 4,
        avatar: "monkey"
    }],
    [{
        id: 5,
        avatar: "hen"
    }, {
        id: 6,
        avatar: "fox"
    }],
    [{
        id: 7,
        avatar: "dog"
    }, {
        id: 8,
        avatar: "cow"
    }]
]


//uncomment the one that you want to use and comment other

export const BASE_URL = PROD;
// export const BASE_URL = TEST;

