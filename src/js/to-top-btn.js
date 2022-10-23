import 'animate.css';

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
    }
}

function backToTop() {
    if (window.pageYOffset > 0) {
        window.scrollBy(0, -80);
        setTimeout(backToTop, 0);
    }
}