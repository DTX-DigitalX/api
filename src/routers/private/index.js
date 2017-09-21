const mount = require('koa-mount');

module.exports = function(server) {

    const userRouter = require('./userRouter');
    server.use(mount('/api/user', userRouter.routes()));

    const eventRouter = require('./eventRouter');
    server.use(mount('/api/event', eventRouter.routes()));

};
