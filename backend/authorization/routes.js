const express = require('express');

const controller = require('./controller');

const router = express.Router();
router.post('/do-register', controller.doRegister);
router.post('/login', controller.login);

module.exports = router;