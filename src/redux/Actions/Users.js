import Axios from 'axios';
const host = process.env.REACT_APP_HOST_API || "http://localhost:3010"

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
        const hosts = window.location.host
        window.location.replace(hosts + "/login")
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