import './main.scss';

import Vue from 'vue';
import Calculator from './components/Calculator.vue';


new Vue({
 el: '#app',
 render: h => h(Calculator),
});


var headerHeight = document.querySelector('.header__wrapper').offsetHeight;
var scrollNavs = document.querySelectorAll('.nav__link');
scrollNavs.forEach(scrollNav =>{
    scrollNav.addEventListener('click', function () {
        event.preventDefault();
        let scrollToSection = document.querySelector('.' + this.dataset.section);
        let sectionOffset = scrollToSection.offsetTop - headerHeight;
        window.scrollTo(0, sectionOffset);
    });
});


var headerSticky = document.querySelector('header');
window.addEventListener('scroll', function () {
    let bodyOffset = document.querySelector('body').getBoundingClientRect().top;
    if (bodyOffset < 0) {
        headerSticky.classList.add('header-show');
    } else {
        headerSticky.classList.remove('header-show');
    }
});

var catalogListItems = document.querySelectorAll('.catalog-list__item');
catalogListItems.forEach(catalogListItem => {
    catalogListItem.addEventListener('click', function(){
        let activeItem = document.querySelector('.catalog-list__item.active');
        activeItem.classList.remove('active');
        this.classList.add('active');
    })
});


import Splide from '@splidejs/splide';

new Splide( '.slider-stranges', {
    classes: {
		arrows: 'splide__arrows stranges-arrows',
		arrow : 'splide__arrow stranges-arrow',
		prev  : 'splide__arrow--prev stranges-arrows-prev',
		next  : 'splide__arrow--next stranges-arrows-next',
  },
} ).mount();

new Splide( '.slider-photo', {
    padding: { right: 200 },
    type   : 'loop',
    classes: {
		arrows: 'splide__arrows photo-arrows container',
		arrow : 'splide__arrow stranges-arrow',
		prev  : 'splide__arrow--prev stranges-arrows-prev',
		next  : 'splide__arrow--next stranges-arrows-next',
  },

} ).mount();
ymaps.ready(
    function(){
    var profileMap = new ymaps.Map("yandexMap", {
        center: [60.086676, 30.381230],
        zoom: 16,
    });

});

