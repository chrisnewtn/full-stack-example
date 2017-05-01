'use strict';

module.exports = new window.auth0.WebAuth({
  domain: process.env.AUTH_DOMAIN,
  clientID: process.env.AUTH_CLIENT_ID,
  redirectUri: window.location.origin,
  responseType: 'token id_token'
});
