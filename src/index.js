import SimpleLightbox from "simplelightbox";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import PixabayApiService from './js-service/pixabay-service.js'
import markupGallery from './templates/card.hbs';
import "simplelightbox/dist/simple-lightbox.min.css";

const refs = {
    gallery: document.querySelector('.js-gallery'),
    form: document.querySelector('.js-search-form'),
    guard: document.querySelector('.guard'),
};
const gallerySimpleLightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
});
console.log(gallerySimpleLightbox);

const pixabayApiService = new PixabayApiService();
// ------ Infinity scroll ------
const options = {
    root: null,
    rootMargin: '200px',
    threshold: 1,
}
const observer = new IntersectionObserver(onLoad, options);
// ----------------------------

refs.form.addEventListener('submit', onSearchSubmit);


function onSearchSubmit(e) {
    e.preventDefault();
    clearGallery();
    pixabayApiService.query = refs.form.elements.searchQuery.value.trim();
    if (pixabayApiService.query === '') {
        return Notify.failure('It cannot be empty field')
    }
    pixabayApiService.resetPage();
    pixabayApiService.fetchPictures().then(checkAndAppendMarkup);
    e.currentTarget.reset();
}


function checkAndAppendMarkup(resultPromise) {
    if (resultPromise.hits.length != 0) {
        Notify.success(`Hooray! We found ${resultPromise.totalHits} images.`);
        appendCardsMarkup(resultPromise);
        observer.observe(refs.guard);
    } else {
        Notify.failure("Sorry, there are no images matching your search query. Please try again.")
    }
}
// ----- настрока infinity scroll ----//
function onLoad(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            onLoadMore();
        }
    })
}
//-----------------------------------//

function onLoadMore() {
    let currentPage = pixabayApiService.currentPage;
    let totalPages = pixabayApiService.allPages;
    if (currentPage > totalPages) {
        Notify.failure("We're sorry, but you've reached the end of search results.");
        observer.unobserve(refs.guard)
    } else {
        return pixabayApiService.fetchPictures().then(appendCardsMarkup);
    }
}

function appendCardsMarkup(card) {
    refs.gallery.insertAdjacentHTML('beforeend', markupGallery(card))
    gallerySimpleLightbox.refresh();
}

function clearGallery() {
    refs.gallery.innerHTML = '';
}
