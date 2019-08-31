// const token = JSON.parse(localStorage.getItem("Token="))
export const openModal = () => {
    return {
        type: 'OPEN_MODAL'
    };
};
export const closeModal = () => {
    return {
        type: 'CLOSE_MODAL'
    };
};