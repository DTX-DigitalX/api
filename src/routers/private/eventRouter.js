'use strict';

const EventService = require('../../services/eventService');
const Router = require('koa-router');

let eventRouter = new Router();

eventRouter.get('', function* (next) {
    try {
        this.body = yield EventService.findAll();
    } catch (e) {
        console.log(e);
        this.status = 500;
        this.exception = e;
        this.body = e.message;
    } finally {
        yield next;
    }
});


eventRouter.put('/', function* (next) {
    try {
        this.body = yield EventService.update(this.request.body);
    } catch (e) {
        console.log(e);
        this.status = 500;
        this.exception = e;
        this.body = e.message;
    } finally {
        yield next;
    }
});

module.exports = eventRouter;
