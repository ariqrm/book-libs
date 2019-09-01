const initialState = {
    transactionListBorrow: [],
    transactionListReturn: [],
    checkBorrowed: [],
    isLoading: false,
    isFulFilled: false,
    isRejected: false,
}

const transaction = (state = initialState, action) =>{
    switch (action.type) {
        case 'GET_TRANSACTION_RETURN_PENDING':
            return {
                ...state,
                isLoading: true,
                isFulFilled: false,
                isRejected: false,
            }
        case 'GET_TRANSACTION_RETURN_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true,
            }
        case 'GET_TRANSACTION_RETURN_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFulFilled: true,
                transactionListReturn: action.payload.data.data,
            }
        case 'GET_BORROWED_DATA_PENDING':
            return {
                ...state,
                isLoading: true,
                isFulFilled: false,
                isRejected: false,
            }
        case 'GET_BORROWED_DATA_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true,
            }
        case 'GET_BORROWED_DATA_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFulFilled: true,
                checkBorrowed: action.payload.data.data[0],
            }
        case 'GET_TRANSACTION_BORROW_PENDING':
            return {
                ...state,
                isLoading: true,
                isFulFilled: false,
                isRejected: false,
            }
        case 'GET_TRANSACTION_BORROW_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true,
            }
        case 'GET_TRANSACTION_BORROW_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFulFilled: true,
                transactionListBorrow: action.payload.data.data,
            }
        default:
            return state
    }
}

export default transaction
