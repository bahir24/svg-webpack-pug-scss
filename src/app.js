import './main.scss';

import Vue from 'vue';
import Calculator from './components/Calculator.vue';


new Vue({
 el: '#app',
 render: h => h(Calculator),
})

