import './main.scss';

import Vue from 'vue';
import TestComponent from './components/TestComponent.vue';


new Vue({
 el: '#app',
 render: h => h(TestComponent),
})

