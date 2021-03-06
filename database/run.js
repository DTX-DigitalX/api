'use strict';

const createDocuments = require('./createDocuments');
const _ = require('lodash');
const co = require('co');
const db = require('../db');
const OAuthClient = require('../src/models/oAuthClientModel').OAuthClient;

db.then( (connection) => {
    co(function *() {
        try {
            yield new Promise((resolve, reject) => {
                connection.db.dropDatabase(err => {
                    if (err) throw err;
                    console.log('\t\x1b[41m', 'Database dropped', '\x1b[0m');
                    resolve();
                });
            });
            //Seeds
            let oauthClients = yield createDocuments(require('./seeds/oauthClients')());
            let accessProfiles = yield createDocuments(require('./seeds/accessProfile')());
            let users = yield createDocuments(require('./seeds/user')(accessProfiles, oauthClients));
            let events = yield createDocuments(require('./seeds/events')());

        } catch (err) {
            console.error(err.stack);
        }
        process.exit();
    });
});
