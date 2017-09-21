'use strict';

const http = require('http');
const koa = require('koa');
const bodyParser = require('koa-body');
const cors = require('koa-cors');
const corsError = require('koa-cors-error');
const gzip = require('koa-gzip');
const mount = require('koa-mount');
const db = require('./db');
const api = require('./src/config/api');
const oauthServer = require('./src/oauth/oauthServer');


let server = module.exports.koa = koa();

server.use(cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
    headers: ['Content-Type', 'Authorization', 'Accept-Ranges', 'X-Minimum-Required-Version', 'X-App-Version'],
    expose: ['X-Minimum-Required-Version'],
    credentials: true
}));
server.use(bodyParser({
    formidable: {
        uploadDir: './uploads/temp'
    }, //This is where the files would come
    multipart: true,
    urlencoded: true
}));
server.use(corsError);
server.use(gzip());

require('./src/routers/public/index')(server);

server.use(mount('/api', oauthServer.authorise()));

require('./src/middlewares/index')(server);
require('./src/routers/private/index')(server);

db.then(() => {

        var con = http.createServer(server.callback());

        con.listen(api.port, () => {
            console.log('Server listening at http://localhost:' + api.port);
        });
    })
    .catch((error) => {
        console.log(error)
    });
