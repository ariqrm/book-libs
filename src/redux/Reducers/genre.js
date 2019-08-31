const initialState = {
    genreList: [],
    isLoading: false,
    isFulFilled: false,
    isRejected: false,
}

const genre = (state = initialState, action) =>{
    switch (action.type) {
        case 'GET_GENRE_PENDING':
            return {
                ...state,
                isLoading: true,
                isFulFilled: false,
                isRejected: false,
            }
        case 'GET_GENRE_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true,
            }
        case 'GET_GENRE_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFulFilled: true,
                genreList: action.payload.data.data,
            }
        default:
            return state
    }
}

export default genre
