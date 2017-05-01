'use strict';

const Vue = require('vue');
const {router} = require('./router');

module.exports = new Vue({router}).$mount('#app');
