import './main.scss';

import Vue from 'vue';
import Calculator from './components/Calculator.vue';


new Vue({
 el: '#app',
 render: h => h(Calculator),
})

var headerSticky = document.querySelector('header');
window.addEventListener('scroll', function () {
    var bodyOffset = document.querySelector('body').getBoundingClientRect().top;
    if (bodyOffset < 0) {
        headerSticky.classList.add('header-show');
    } else {
        headerSticky.classList.remove('header-show');
    }

});

var catalogListItems = document.querySelectorAll('.catalog-list__item');
catalogListItems.forEach(catalogListItem => {
    catalogListItem.addEventListener('click', (e)=>{
        let currItem = e.target;
        if(!currItem.classList.contains('catalog-list__item')){
            currItem = currItem.closest('.catalog-list__item');
        }
        let activeItem = document.querySelector('.catalog-list__item.active');
        activeItem.classList.remove('active');
        currItem.classList.add('active');
        console.log(currItem);
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
		arrows: 'splide__arrows stranges-arrows',
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

