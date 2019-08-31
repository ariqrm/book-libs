const initialState = {
    transactionListBorrow: [],
    transactionListReturn: [],
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
