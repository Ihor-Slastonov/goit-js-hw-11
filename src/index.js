
import PixabayApiService from './js-service/pixabay-service.js'
import markupGallery from './templates/card.hbs';

const refs = {
    gallery: document.querySelector('.js-gallery'),
    form: document.querySelector('.js-search-form'),
    loadMoreBtn: document.querySelector('.js-btn-more'),
};
// refs.loadMoreBtn.setAttribute('hidden','true')
const pixabayApiService = new PixabayApiService();


refs.form.addEventListener('submit', onSearchSubmit);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onSearchSubmit(e) {
    e.preventDefault();
    clearGallery();
    pixabayApiService.query = refs.form.elements.searchQuery.value;
    pixabayApiService.resetPage()
    pixabayApiService.fetchPictures().then(appendCardsMarkup);
}

function onLoadMore() {
    pixabayApiService.fetchPictures().then(appendCardsMarkup);
}

function appendCardsMarkup(card) {
    refs.gallery.insertAdjacentHTML('beforeend', markupGallery(card))
}

function clearGallery() {
    refs.gallery.innerHTML = '';
}