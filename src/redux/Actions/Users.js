import Axios from 'axios';

const token = JSON.parse(localStorage.getItem("Token="))
export const signIn = (data) => {
    return {
        type: 'SIGN_IN',
        payload: Axios.post(`http://localhost:3010/user/signin`, data),
    };
};
export const signUp = (data) => {
    return {
        type: 'SIGN_UP',
        payload: Axios.post(`http://localhost:3010/user/register`, data),
    };
};
export const handleDataAuth = () => {
    // const data = JSON.parse(localStorage.getItem('Data='))
    // this.setState({
    //     user: data
    // })
    const auth = localStorage.getItem('Token=')
    if (!auth) {
        document.location.replace("http://localhost:3030/login")
    }
}
export const userInfo = () => {
    // const data = JSON.parse(localStorage.getItem('Data='))
    return {
        type: 'GET_DATA_USER',
        payload: Axios.get(`http://localhost:3010/user/jwt`, {
            headers: {
                Authorization: token,
            },
        }),
    }
}