'use strict';

const Vue = require('vue');
const VueRouter = require('vue-router');

Vue.use(VueRouter);

const Login = require('./components/Login');
const Default = require('./components/Default');

const routes = [
  {
    path: '/',
    component: Default
  },
  {
    path: '/login',
    component: Login
  }
];

exports.router = new VueRouter({mode: 'history', routes});
exports.push = route => exports.router.push(route);
exports.go = n => exports.router.go(n);
