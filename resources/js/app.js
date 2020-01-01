
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

import App from './components/App.vue';
import router from './router.js';
import Toast from 'cxlt-vue2-toastr'
import 'cxlt-vue2-toastr/dist/css/cxlt-vue2-toastr.css'
//import store from './store';

window.Vue = require('vue');

Vue.use(Toast, { position: 'bottom right', showDuration: 3000 })
/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i);
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default));
/*
Vue.component('example-component', require('./components/ExampleComponent.vue').default);
Vue.component('image-carousel', require('./components/ImageCarousel.vue').default);
Vue.component('carousel-control', require('./components/CarouselControl.vue').default);
Vue.component('modal-window', require('./components/ModalWindow.vue').default);
Vue.component('header-image', require('./components/HeaderImage.vue').default);
*/
/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    el: '#app',
    render: h => h(App),
    router,
//    store,
});
