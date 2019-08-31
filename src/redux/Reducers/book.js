const initialState = {
    bookList: [],
    yearList: [],
    bookDetail: [],
    isLoading: false,
    isFulFilled: false,
    isRejected: false,
    bookAdded: [],
    bookDeleted: [],
    bookUpdated: [],
    bookTransaction: false,
}

const book = (state = initialState, action) =>{
    switch (action.type) {
        
        case 'GET_BOOK_FILTER_PENDING':
        return {
            ...state,
            isLoading: true,
            isFulFilled: false,
            isRejected: false,
        }
        case 'GET_BOOK_FILTER_REJECTED':
        return {
            ...state,
            isLoading: false,
            isRejected: true,
        }
        case 'GET_BOOK_FILTER_FULFILLED':
        return {
            ...state,
            isLoading: false,
            isFulFilled: true,
            bookList: action.payload.data.data,
        }
        case 'GET_BOOK_ID_PENDING':
        return {
            ...state,
            isLoading: true,
            isFulFilled: false,
            isRejected: false,
        }
        case 'GET_BOOK_ID_REJECTED':
        return {
            ...state,
            isLoading: false,
            isRejected: true,
        }
        case 'GET_BOOK_ID_FULFILLED':
        return {
            ...state,
            isLoading: false,
            isFulFilled: true,
            bookDetail: action.payload.data.data,
        }
        case 'GET_YEAR_PENDING':
            return {
                ...state,
                isLoading: true,
                isFulFilled: false,
                isRejected: false,
            }
        case 'GET_YEAR_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true,
            }
        case 'GET_YEAR_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFulFilled: true,
                yearList: action.payload.data.data,
            }
        case 'GET_BOOK_PENDING':
            return {
                ...state,
                isLoading: true,
                isFulFilled: false,
                isRejected: false,
            }
        case 'GET_BOOK_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true,
            }
        case 'GET_BOOK_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFulFilled: true,
                bookList: action.payload.data.data,
            }
        case 'ADD_BOOK_PENDING':
            return {
                ...state,
                isLoading: true,
                isFulFilled: false,
                isRejected: false,
            }
        case 'ADD_BOOK_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true,
            }
        case 'ADD_BOOK_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFulFilled: true,
                bookAdded: action.payload.data.data,
            }
        case 'DELETE_BOOK_PENDING':
            return {
                ...state,
                isLoading: true,
                isFulFilled: false,
                isRejected: false,
            }
        case 'DELETE_BOOK_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true,
            }
        case 'DELETE_BOOK_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFulFilled: true,
                bookDeleted: action.payload.data.data,
            }
        case 'UPDATE_BOOK_PENDING':
            return {
                ...state,
                isLoading: true,
                isFulFilled: false,
                isRejected: false,
            }
        case 'UPDATE_BOOK_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true,
            }
        case 'UPDATE_BOOK_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFulFilled: true,
                bookUpdated: action.payload.data.data,
            }
        case 'TRANSACTION_BOOK':
            return {
                ...state,
                bookTransaction: action.payload.data.data,
            }
        default:
            return state
    }
}

export default book
