import FileColors from './js/colors.js';
import './main.scss';

// console.log(FileColors);

import Vue from 'vue';
import TestComponent from './components/TestComponent.vue';



new Vue({
 el: '#app',
 render: h => h(TestComponent),
})

