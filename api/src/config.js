'use strict';

const configMap = {
  'AUTH_DOMAIN': {
    name: 'authDomain'
  },
  'AUTH_CLIENT_ID': {
    name: 'authClientId'
  }
};

Object.keys(configMap).reduce((config, key) => {
  if (!process.env[key]) {
    throw new Error(`Missing "${key}" from environment`);
  }
  return Object.assign(config, {[configMap[key].name]: process.env[key]});
}, exports);
