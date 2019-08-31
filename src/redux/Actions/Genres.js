import Axios from 'axios';

const token = JSON.parse(localStorage.getItem("Token="))
export const getGenre = () => {
    return {
        type: 'GET_GENRE',
        payload: Axios.get('http://localhost:3010/genre', {
            headers: {
                Authorization: token,
            },
        }),
    };
};