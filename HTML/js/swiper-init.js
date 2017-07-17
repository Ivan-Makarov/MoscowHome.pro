'use strict';

const mySwiper = new Swiper( '.swiper-container',
    {
        direction: 'horizontal',
        loop: true,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        autoplay: 10000,
        speed: 1500,
    }
)

const buttons = [...document.querySelectorAll('.services--button')];

function changeSlide(e) {
    const serviceItem = e.target.parentElement.parentElement;
    if (e.target.classList.contains('services--button__prev')) {
        serviceItem.querySelector('.swiper-button-prev').click();
    } else if (e.target.classList.contains('services--button__next')) {
        serviceItem.querySelector('.swiper-button-next').click();
    }
}

buttons.forEach(button => button.addEventListener('click', changeSlide));
