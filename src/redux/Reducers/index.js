import { combineReducers } from 'redux';

import book from './book'
import genre from './genre'
import modal from './modal'
import transaction from './transaction'
import user from './user'

const rootReducers = combineReducers({
    book,
    genre,
    modal,
    transaction,
    user,
})

export default rootReducers