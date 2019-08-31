import Axios from 'axios';

const token = JSON.parse(localStorage.getItem("Token="))
export const getReturn = (id) => {
    return {
        type: 'GET_TRANSACTION_RETURN',
        payload: Axios.get(`http://localhost:3010/transaction/borrowed/${id}`, {
            headers: {
                Authorization: token,
            },
        }),
    };
};
export const getBorrow = (id) => {
    return {
        type: 'GET_TRANSACTION_BORROW',
        payload: Axios.get(`http://localhost:3010/transaction/returned/${id}`, {
            headers: {
                Authorization: token,
            },
        }),
    };
};