'use strict';

const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

const config = require('../config');

function handleError(err, req, res, next) {
  if (!(err instanceof jwt.UnauthorizedError)) {
    return next(err);
  }
  res.setHeader('Content-Type', 'text/plain');
  res.status(err.status).send(err.message);
}

exports.check = () => {
  const checkJwt = jwt({
    secret: jwksRsa.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `https://${config.authDomain}/.well-known/jwks.json`
    }),
    audience: config.authClientId,
    issuer: `https://${config.authDomain}/`,
    algorithms: ['RS256']
  });

  return [checkJwt, handleError];
};
