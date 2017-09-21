'use strict';

const Router = require('koa-router');
const UserService = require('../../services/userService');

let resetPasswordRouter = new Router();

resetPasswordRouter.post('', function* (next) {
    let email = this.request.body.email;

    if (!email) {
        this.status = 500;
        this.body = 'É necessário informar um email';
        return;
    }

    try {
        yield UserService.passwordReset(email);
        this.status = 200;
        this.body = "Email enviado";
    } catch (error) {
        this.status = 404;
        this.exception = error;
        this.body = error.message || error;
    }

});

module.exports = resetPasswordRouter;
