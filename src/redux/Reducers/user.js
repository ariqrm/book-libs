const initialState = {
    userInfo: [],
    userName: "",
    userToken: [],
    isLoading: false,
    isFulFilled: false,
    isRejected: false,
}

const user = (state = initialState, action) =>{
    switch (action.type) {
        case 'SIGN_IN_PENDING':
            return {
                ...state,
                isLoading: true,
                isFulFilled: false,
                isRejected: false,
            }
        case 'SIGN_IN_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true,
            }
        case 'SIGN_IN_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFulFilled: true,
                userInfo: action.payload.data.data,
            }
        case 'SIGN_UP_PENDING':
            return {
                ...state,
                isLoading: true,
                isFulFilled: false,
                isRejected: false,
            }
        case 'SIGN_UP_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true,
            }
        case 'SIGN_UP_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFulFilled: true,
                userInfo: action.payload.data.data,
            }
        case 'GET_DATA_USER_PENDING':
            return {
                ...state,
                isLoading: true,
                isFulFilled: false,
                isRejected: false,
            }
        case 'GET_DATA_USER_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true,
            }
        case 'GET_DATA_USER_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFulFilled: true,
                userInfo: action.payload.data.data,
                userName: action.payload.data.data.Username
            }
        default:
            return state
    }
}

export default user
