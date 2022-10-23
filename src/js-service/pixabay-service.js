import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '30754633-49a4360a1de811b7fe1cb3ed9';

export default class PixabayApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
        this.perPage = 40;
        this.totalPages = 0;
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
                    per_page: this.perPage,
                }
            });
            this.incrementPage();
            const data = await response.data;
            let pages = Math.ceil(data.totalHits / data.hits.length);
            this.totalPages = pages;
            return data
        } catch (error) {
            console.log(error);
        }
    }

    resetPage() {
        this.page = 1;
    }
    incrementPage() {
        this.page += 1;
    }
    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }

    get currentPage() {
        return this.page
    }

    set currentPage(value) {
        this.page = value;
    }

    get allPages() {
        return this.totalPages;
    }
    set allPages(value) {
        this.totalPages = value;
    }
}
