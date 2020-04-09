import Vue from 'vue';

import Vuesax from 'vuesax'
import 'vuesax/dist/vuesax.css' //Vuesax styles
//import 'material-icons/iconfont/material-icons.css';
import 'material-icons/iconfont/material-icons.css';

import App from './App.vue';

import store from './store/store';
import router from './router';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
//import VueGtag from "vue-gtag";
//import googleTC from "./fanbase/Config.js";

//var SocialSharing = require('vue-social-sharing');

Vue.config.productionTip = true;

//Vue.use(SocialSharing);

Vue.use(Vuesax)
/*
Vue.use(VueGtag, {
    config: {        
        id: "UA-162050286-6",
        params: {
            send_page_view: false
        }
    }
});
*/

new Vue({
    data:
    {        
    },
    store,
    router,
    render: h => h(App)
}).$mount('#app');
