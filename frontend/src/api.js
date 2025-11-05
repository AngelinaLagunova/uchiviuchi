import axios from 'axios';

const API_URL = 'http://учивыучи.рф:8000/api/v1/basevocabs/';
// const API_URL = 'http://127.0.0.1:8000/api/v1/basevocabs/';


export const fetchWords = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Ошибка при получении данных:', error);
        throw error;
    }
};

export const fetchWordById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}${id}/`);
        return response.data;
    } catch (error) {
        console.error('Ошибка при получении слова:', error);
        throw error;
    }
};


