import Vue from 'vue'
import App from './App.vue'
import '../node_modules/bulma/css/bulma.min.css';
import router from './router'
require('dotenv').config();

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
