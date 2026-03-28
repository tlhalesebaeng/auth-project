const express = require('express');

const controller = require('./controller');

const router = express.Router();
router.post('/do-register', controller.doRegister);

//guys is routes.js supposed to be here?
router.post('/forgot-password', controller.forgotPassword);

router.post('/do-reset-password', controller.doResetPassword);

module.exports = router;
