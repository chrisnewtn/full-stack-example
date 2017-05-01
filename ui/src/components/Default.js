'use strict';

const Vue = require('vue');
const auth = require('../auth');
const router = require('../router');

const onHashParse = (err, authResult) => {
  if (err) {
    return console.error(err);
  }
  if (authResult && authResult.error) {
    return console.error(authResult.error);
  }
  if (authResult && authResult.accessToken && authResult.idToken) {
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('access_token', authResult.accessToken);
  }
};

module.exports = Vue.component('app-default', {
  template: '<div></div>',
  data() {
    return {
      idToken: localStorage.getItem('id_token'),
      accessToken: localStorage.getItem('access_token')
    };
  },
  mounted() {
    if (!this.idToken || !this.accessToken) {
      if (window.location.hash.includes('access_token')) {
        return auth.parseHash(onHashParse);
      }
      return router.push('/login');
    }
  }
});
