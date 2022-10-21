import Notiflix from "notiflix";
import fetchPictures from './js/fetchPictures.js';
import markupGallery from './templates/card.hbs';

const gallery = document.querySelector('.gallery');

fetchPictures('dog').then(data => {
    gallery.insertAdjacentHTML('beforeend', markupGallery(data));
}).catch(console.log);

