'use strict';

const Router      = require('koa-router');
const oauthServer = require('../../oauth/oauthServer');
const UserService = require('../../services/userService');

let oauthRouter = new Router();

oauthRouter.post('/oauth/token', oauthServer.grant());
oauthRouter.get('/validateUserEmail/:email', function* (next) {
    try {
        this.body = yield UserService.findByEmail(this.params.email);
    } catch (e) {
        console.log(e);
        this.status = 400;
        this.exception = e;
        this.body =  { code:400, message : e.message};
    } finally {
        yield next;
    }
});

module.exports = oauthRouter;
