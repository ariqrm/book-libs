import Axios from 'axios';
const host = "http://localhost:3010" || process.env.REACT_APP_HOST_API
const token = JSON.parse(localStorage.getItem("Token="))
export const signIn = (data) => {
    return {
        type: 'SIGN_IN',
        payload: Axios.post(host+`/user/signin`, data),
    };
};
export const signUp = (data) => {
    return {
        type: 'SIGN_UP',
        payload: Axios.post(host+`/user/register`, data),
    };
};
export const handleDataAuth = () => {
    const auth = localStorage.getItem('Token=')
    if (!auth) {
        const host = window.location.host
        document.location.replace(host + "/login")
    }
}
export const userInfo = () => {
    return {
        type: 'GET_DATA_USER',
        payload: Axios.get(host+`/user/jwt`, {
            headers: {
                Authorization: token,
            },
        }),
    }
}