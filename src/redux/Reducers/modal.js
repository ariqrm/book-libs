const initialState = {
    myModal: false,
}

const modal = (state = initialState, action) =>{
    switch (action.type) {
        case 'OPEN_MODAL':
            return {
                ...state,
                myModal: true,
            }
        case 'CLOSE_MODAL':
            return {
                ...state,
                myModal: false,
            }
        default:
            return state
    }
}

export default modal
