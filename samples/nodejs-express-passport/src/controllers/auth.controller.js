const authController = require('express').Router();
const passport = require('passport');
const authService = require('../services/auth/auth.service');

authController.post('/sign-in', (req, res, next) => {
    const { username, password } = req.body;
    res.status(200).json({
        token: authService.login(username, password)
    });
});

authController.get('/test', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    console.log(req.user);
    res.status(200).json({
        message: 'hello'
    });
});


module.exports = function(app) {
    app.use('/auth', authController);
};
