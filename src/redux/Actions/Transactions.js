import Axios from 'axios';
const host = "http://localhost:3010"
//  process.env.REACT_APP_HOST_API ||
const token = JSON.parse(localStorage.getItem("Token="))
export const getReturn = (id) => {
    return {
        type: 'GET_TRANSACTION_RETURN',
        payload: Axios.get(host+`/transaction/borrowed/${id}`, {
            headers: {
                Authorization: token,
            },
        }),
    };
};
export const getBorrow = (id) => {
    return {
        type: 'GET_TRANSACTION_BORROW',
        payload: Axios.get(host+`/transaction/returned/${id}`, {
            headers: {
                Authorization: token,
            },
        }),
    };
};
export const checkBorrowed = (id) => {
    // const data = { id_book: id }
    return {
        type: 'GET_BORROWED_DATA',
        payload: Axios.get(host+`/transaction/check/borrowed/${id}`, {
            headers: {
                Authorization: token,
            },
        }),
    };
};