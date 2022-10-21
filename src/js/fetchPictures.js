import axios from "axios";


const BASE_URL = 'https://pixabay.com/api/';
const KEY = '30754633-49a4360a1de811b7fe1cb3ed9';


export default async function fetchPictures(name) {
    const response = await axios.get(BASE_URL, {
        params: {
            key: KEY,
            q: name,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: 'true',
        }
    })
    return await response.data
}