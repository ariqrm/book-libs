import Axios from 'axios';
const host = "http://localhost:3010" || process.env.REACT_APP_HOST_API
const token = JSON.parse(localStorage.getItem("Token="))
export const getGenre = () => {
    return {
        type: 'GET_GENRE',
        payload: Axios.get(host+'/genre', {
            headers: {
                Authorization: token,
            },
        }),
    };
};