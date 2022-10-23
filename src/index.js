import SmoothScroll from "smoothscroll-for-websites";
import SimpleLightbox from "simplelightbox";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import PixabayApiService from './js-service/pixabay-service.js'
import markupGallery from './templates/card.hbs';
import "simplelightbox/dist/simple-lightbox.min.css";
import 'animate.css';


const refs = {
    gallery: document.querySelector('.js-gallery'),
    form: document.querySelector('.js-search-form'),
    guard: document.querySelector('.guard'),
};
refs.form.addEventListener('submit', onSearchSubmit);

const gallerySimpleLightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
});


const pixabayApiService = new PixabayApiService();
// ------ Infinity scroll setup ------
const options = {
    root: null,
    rootMargin: '200px',
    threshold: 1,
}
const observer = new IntersectionObserver(onLoad, options);
// ----------------------------


function onSearchSubmit(e) {
    e.preventDefault();
    clearGallery();

    pixabayApiService.query = refs.form.elements.searchQuery.value.trim()
    if (pixabayApiService.query === '') {
        Notify.failure('It cannot be empty field')
        return;
    }
    pixabayApiService.resetPage();
    pixabayApiService.fetchPictures().then(checkAndAppendMarkup);
    e.currentTarget.reset()
}


function checkAndAppendMarkup(resultPromise) {
    if (resultPromise.hits.length != 0) {
        Notify.success(`Hooray! We found ${resultPromise.totalHits} images.`);
        appendCardsMarkup(resultPromise);
        observer.observe(refs.guard);
        smoothScroll()
    } else {
        Notify.failure("Sorry, there are no images matching your search query. Please try again.")
        return
    }
}
// ----- infinity scroll ----//
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
    if (pixabayApiService.query === '') {
        return;
    }
    refs.gallery.insertAdjacentHTML('beforeend', markupGallery(card))
    gallerySimpleLightbox.refresh();
}

function clearGallery() {
    refs.gallery.innerHTML = '';
    SmoothScroll.destroy()
}
function smoothScroll() {
    SmoothScroll({
        stepSize: 175,
        animationTime: 800,
        accelerationDelta: 200,
        accelerationMax: 6,
        keyboardSupport: true,
        arrowScroll: 100,
    });
}
// --------------------Back-To-Top--------------------------//
const toTopBtn = document.querySelector('.back-to-top');
toTopBtn.addEventListener('click', backToTop);
window.addEventListener('scroll', onScroll);

function onScroll() {
    const scrolledValue = window.pageYOffset;
    const coords = document.documentElement.clientHeight;
    if (scrolledValue > coords) {
        toTopBtn.classList.add('back-to-top--show', 'animate__animated', 'animate__heartBeat')
    }
    if (scrolledValue < coords) {
        toTopBtn.classList.remove('back-to-top--show')
        toTopBtn.removeEventListener(backToTop);
    }

}

function backToTop() {
    if (window.pageYOffset > 0) {
        window.scrollBy(0, -80);
        setTimeout(backToTop, 0);
    }
}
// -------------------------------------------------------//
