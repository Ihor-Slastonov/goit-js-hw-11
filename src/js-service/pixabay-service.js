import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '30754633-49a4360a1de811b7fe1cb3ed9';

export default class PixabayApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }
    async fetchPictures() {
        try {
            const response = await axios.get(BASE_URL, {
                params: {
                    key: KEY,
                    q: this.searchQuery,
                    image_type: 'photo',
                    orientation: 'horizontal',
                    safesearch: 'true',
                    page: this.page,
                    per_page: 40,
                }
            });
            this.page += 1;
            return await response.data;
        } catch (error) {
            console.log(error);
        }
    }

    resetPage() {
        this.page = 1;
    }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}
