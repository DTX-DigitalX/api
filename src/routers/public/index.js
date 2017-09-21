const mount = require('koa-mount');

module.exports = function (server) {
    const oauthRouter = require('./oauthRouter');
    server.use(oauthRouter.routes());

    const resetPasswordRouter = require('./resetPasswordRouter');
    server.use(mount('/api/resetpassword', resetPasswordRouter.routes()));

    const eventRouter = require('./eventRouter');
    server.use(mount('/event', eventRouter.routes()));

};
