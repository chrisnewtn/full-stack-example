'use strict';

const cors = require('cors');
const {Router} = require('express');
const jwt = require('./middleware/jwt');

const router = new Router();

router.use(cors());
router.use(jwt.check());

router.use('/user', (req, res) => res.json({user_id: req.user.sub}));

exports.router = router;
