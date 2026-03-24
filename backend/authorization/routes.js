const express = require('express');
const controller = require('./controlller');
const router = express.Router();
router.post('/do-register', controller.doRegister);

module.exports = router;