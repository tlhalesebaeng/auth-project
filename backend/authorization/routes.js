const controller = require('./controller');
const express = require('express');
const router = express.Router();

router.post('/do-register', controller.doRegister);

module.exports = router;