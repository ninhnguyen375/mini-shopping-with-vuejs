import 'jquery/dist/jquery.min';
import 'popper.js/dist/popper.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';
import Axios from 'axios';
import Vue from 'vue';
import './registerServiceWorker';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import VeeValidate, { Validator } from 'vee-validate';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faShoppingCart, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import store from './store/store';
import router from './router';
import App from './App.vue';

library.add([faShoppingCart, faTrashAlt]);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Axios.defaults.baseURL = process.env.NODE_ENV === 'production'
  ? 'https://api-with-json-server.herokuapp.com/'
  : 'http://localhost:3000';

Vue.use(VeeValidate);
Validator.extend('confirmed', (value, [otherValue]) => value === otherValue, {
  hasTarget: true,
});
Validator.extend(
  'duplicateEmail',
  {
    validate: async (value) => {
      try {
        const user = await Axios.get(`/users?email=${value}`);

        if (user.data[0]) {
          return false;
        }
      } catch (err) {
        console.log(err);
      }
      return true;
    },
    getMessage: () => 'This email has been used!',
  },
  {
    hasTarget: true,
  },
);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
