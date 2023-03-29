const PROD = 'http://phoenix-rest-api.herokuapp.com';
export const socketURL = "https://phoenix-socket-server.herokuapp.com/"

export const primaryColor = "#296896"
export const secondaryColor = "#4A89B7"
export const darkColor = "#2F4348"


export const Rows = 5;
export const Cols = 5;
export const StartPosition = [4, 0];
export const EndPosition = [0, 4];
// export const flags = [[0, 1], [1, 3], [2, 0], [3, 4], [4, 2]];
// export const mines = [[0, 3], [1, 1], [2, 4], [3, 2], [4, 3]];
export const boards = {

    '0': {
        flags: [[0, 1], [1, 0], [1, 2], [3, 0], [3, 4], [4, 3]],
        mines: [[0, 0], [0, 3], [2, 1], [2, 4], [3, 2], [4, 1]]
    },
    '1': {
        flags: [[0, 1], [1, 3], [2, 0], [2, 3], [3, 2], [4, 2]],
        mines: [[0, 3], [1, 0], [2, 1], [3, 0], [3, 4], [4, 3]]
    },
    '2': {
        flags: [[0, 2], [1, 1], [1, 4], [2, 4], [3, 3], [4, 1]],
        mines: [[0, 0], [0, 3], [1, 2], [2, 1], [3, 2], [4, 3]]
    },
    '3': {
        flags: [[0, 1], [1, 2], [1, 4], [2, 1], [3, 2], [4, 4]],
        mines: [[0, 3], [1, 1], [2, 3], [3, 0], [3, 4], [4, 1]]
    },
    '4': {
        flags: [[0, 0], [0, 2], [1, 4], [2, 1], [3, 1], [4, 3]],
        mines: [[0, 3], [1, 1], [1, 3], [2, 0], [3, 2], [4, 4]]
    },
    '5': {
        flags: [[0, 0], [1, 0], [1, 4], [2, 1], [3, 4], [4, 2]],
        mines: [[0, 3], [1, 2], [2, 0], [2, 4], [3, 1], [4, 4]]
    }
}


export const avatarImage = ['cat', 'panda', 'pig', 'monkey', 'hen', 'fox', 'dog', 'cow']

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


export const UserProfileImage = (profileImage) => {
    switch (profileImage) {
        case 'cat':
            return require('../assets/cat.png')
        case 'panda':
            return require('../assets/panda.png')
        case 'pig':
            return require('../assets/pig.png')
        case 'monkey':
            return require('../assets/monkey.png')
        case 'hen':
            return require('../assets/hen.png')
        case 'fox':
            return require('../assets/fox.png')
        case 'dog':
            return require('../assets/dog.png')
        case 'cow':
            return require('../assets/cow.png')
        default:
            return require('../assets/placeholder.jpeg')

    }
}

export const HomeUserProfileImage = (profileImage) => {
    switch (profileImage) {
        case 'cat':
            return require('../assets/cat4.png')
        case 'panda':
            return require('../assets/panda4.png')
        case 'pig':
            return require('../assets/pig4.png')
        case 'monkey':
            return require('../assets/monkey4.png')
        case 'hen':
            return require('../assets/hen4.png')
        case 'fox':
            return require('../assets/fox4.png')
        case 'dog':
            return require('../assets/dog4.png')
        case 'cow':
            return require('../assets/cow4.png')
        default:
            return require('../assets/placeholder.jpeg')

    }
}

export const FB_APP_ID = "230981376160035"

//uncomment the one that you want to use and comment other

export const BASE_URL = PROD;
// export const BASE_URL = TEST;

export const coupons = [
    {
        id: 1,
        couponCode: "XBBX",
        coins: "3000",
        image: require('../assets/timHortonsCoupon.png'),
        description: "Tim hortons Coupon"
    },
    {
        id: 2,
        couponCode: "XBBX",
        coins: "2700",
        image: require('../assets/timHortonsCoupon.png'),
        description: "Tim hortons Coupon"
    },
    {
        id: 3,
        couponCode: "XBBX",
        coins: "5000",
        image: require('../assets/burgerKingCoupon.png'),
        description: "Tim hortons Coupon"
    },
    {
        id: 4,
        couponCode: "XBBX",
        coins: "2000",
        image: require('../assets/burgerKingCoupon.png'),
        description: "Tim hortons Coupon"
    },
]

