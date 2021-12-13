import './main.scss';

import Vue from 'vue';
import Calculator from './components/Calculator.vue';


new Vue({
 el: '#app',
 render: h => h(Calculator),
});

var pageObject = {
    init(){
        if(this.close()){
            this.listeners.closeListener(this);
        };
        if(this.modalButtons){
            this.listeners.buttonListener(this);
        };
        if(this.modalForm()){
            this.listeners.formSubmitListener(this);
        };
    },
    listeners:{
        closeListener(mainObject){
            mainObject.close().addEventListener('click', ()=> mainObject.closeModal());
        },
        buttonListener(mainObject){
            mainObject.modalButtons.forEach(button =>{
                button.addEventListener('click', (event) => mainObject.showModal(button));
            });
        },
        formSubmitListener(mainObject){
            mainObject.modalForm().addEventListener('submit', (event)=> mainObject.modalFormSubmit());
        },
    },

    modal(){
        return document.querySelector('.modal');
    },
    close(){
        return this.modal().querySelector('.close');
    },
    modalForm(){
        return this.modal().querySelector('form');
    },
    pricelistForm(){
        return document.forms.pricelist;
    },
    validation(){
        let validationFields = this.modal().querySelectorAll('.validation');
        let validationElements = {};
        validationFields.forEach((element, index) => {
            let name = element.parentNode.querySelector('input').name;
            validationElements[name] = element;
        });
        return validationElements;
    },
    success(){
        return this.modal().querySelector('.success');
    },
    modalButtons: document.querySelectorAll('[data-target="feedbackModal"]'),
    body: document.querySelector('body'),


    modalFormSubmit(){
        event.preventDefault();
        let formData = new FormData(this.modalForm());
        fetch('/message.php', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(json => {
            this.clearValidation();
            if(json.errors){
                this.fillValidation(json.errors);
            } else if(json.success){
                this.success().textContent = json.success;
                setTimeout(()=>{
                    this.closeModal();
                    this.clearHiddenInputs();
                }, 2000);
            }
        });

    },
    clearHiddenInputs(){
        let hiddenInputs = this.modalForm().querySelectorAll('[type="hidden"]');
        hiddenInputs.forEach(input =>{
            input.remove();
        })

    },
    closeModal(){
        this.modal().classList.add('modal-hide');
        this.body.classList.remove('body-blocked');
        this.modalForm().reset();
        this.clearValidation();
        this.clearSuccess();
    },
    showModal(button){
        event.preventDefault();
        this.modal().classList.remove('modal-hide');
        this.body.classList.add('body-blocked');
        this.addDataToModal(button);
    },
    addDataToModal(button){
        let input = document.createElement('input');
        input.type = "hidden";
        input.name = button.name;
        input.value = (button.name == 'service') ? this.pricelistForm().pricelist.value : button.value;
        this.modalForm().appendChild(input);
    },
    fillValidation(errors){
        Object.keys(errors).forEach(errorKey => {
            this.validation()[errorKey].textContent = errors[errorKey];
        });
    },
    clearValidation(){
        Object.values(this.validation()).forEach(msg => {
            msg.textContent = '';
        });
    },
    clearSuccess(){
        this.success().textContent = '';
    }

};
pageObject.init();

var feedbackForm = {
    init(){
        if(this.feedbackForm()){
            this.formSubmitListener(this);
        };
    },
    formSubmitListener(mainObject){
        mainObject.feedbackForm().addEventListener('submit', (event)=> mainObject.feedbackFormSubmit());
    },
    feedback(){
        return document.querySelector('#feedback');
    },

    feedbackForm(){
        return this.feedback().querySelector('form');
    },
    validation(){
        let validationFields = this.feedbackForm().querySelectorAll('.validation');
        let validationElements = {};
        validationFields.forEach((element, index) => {
            let name = element.parentNode.querySelector('input').name;
            validationElements[name] = element;
        });
        return validationElements;
    },
    success(){
        return this.feedback().querySelector('.success');
    },

    feedbackFormSubmit(){
        event.preventDefault();
        let formData = new FormData(this.feedbackForm());
        fetch('/message.php', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(json => {
            this.clearValidation();
            if(json.errors){
                this.fillValidation(json.errors);
            } else if(json.success){
                this.success().textContent = json.success;
                setTimeout(()=>{
                    this.clearSuccess();
                }, 2000);
            } else {
                console.log(json);
            }
        });

    },

    fillValidation(errors){
        Object.keys(errors).forEach(errorKey => {
            this.validation()[errorKey].textContent = errors[errorKey];
        });
    },
    clearValidation(){
        Object.values(this.validation()).forEach(msg => {
            msg.textContent = '';
        });
    },
    clearSuccess(){
        this.success().textContent = '';
        this.feedbackForm().reset();
    }

};
feedbackForm.init();





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




var mobileScrollNavs = document.querySelectorAll('.nav-mobile__link');
if(mobileScrollNavs){
    mobileScrollNavs.forEach(mobileScrollNav =>{
        mobileScrollNav.addEventListener('click', function () {
            event.preventDefault();
            let scrollToSection = document.querySelector('.' + this.dataset.section);
            let sectionOffset = scrollToSection.offsetTop - headerHeight;
            window.scrollTo(0, sectionOffset);
            switchMobileMenu();
        });
    });
}

var mobileButtons = document.querySelector('.mobile-buttons__wrapper').childNodes;

mobileButtons.forEach(btn =>{
    btn.addEventListener('click', function () {
        event.preventDefault();
        let scrollToSection = document.querySelector('.' + this.dataset.section);
        let sectionOffset = scrollToSection.offsetTop - headerHeight;
        window.scrollTo(0, sectionOffset);
    });
});


var headerSticky = document.querySelector('.header__bottom');
window.addEventListener('scroll', function () {
    let bodyOffset = document.querySelector('body').getBoundingClientRect().top;
    if (bodyOffset < -1) {
        headerSticky.classList.add('header-show');
    } else {
        headerSticky.classList.remove('header-show');
    }
});

var catalogListItems = document.querySelectorAll('.catalog-list__item');
catalogListItems.forEach(catalogListItem => {
    catalogListItem.addEventListener('click', function(){
        document.querySelector('.catalog-list__item.active').classList.remove('active');
        this.classList.add('active');
    })
});

var catalogMobileDropdowns = document.querySelectorAll('.prices-mobile__dropdown');
catalogMobileDropdowns.forEach(dropdown => {
    dropdown.addEventListener('click', function(){
        console.log(this);
        document.querySelector('.prices-mobile__dropdown.active').classList.remove('active');
        this.classList.add('active');
    })
});



var burgerButton = document.querySelector('.burger-button');
var mobileMenu = document.querySelector('.header__nav-mobile');
burgerButton.addEventListener('click', function(){
    switchMobileMenu();
});
function switchMobileMenu(){
    burgerButton.classList.toggle('burger-menu-open');
    mobileMenu.classList.toggle('menu-open');
}

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
    pagination: false,
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

