import Axios from 'axios';
const host = process.env.REACT_APP_HOST_API || "http://localhost:3010"

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