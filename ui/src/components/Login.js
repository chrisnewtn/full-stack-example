'use strict';

const fs = require('fs');
const Vue = require('vue');
const auth = require('../auth');
const template = fs.readFileSync(__dirname + '/../templates/login.html', 'utf8');

module.exports = Vue.component('login', {
  template,
  data: () => ({
    showForm: false,
    disabledLoading: false
  }),
  methods: {
    loginWithGoogle() {
      this.disabledLoading = true;
      auth.authorize({connection: 'google-oauth2'});
    }
  }
});
