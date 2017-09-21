'use strict';

const OAuthToken = require('../models/oAuthTokenModel').OAuthToken;
const OAuthClient = require('../models/oAuthClientModel').OAuthClient;
const UserService = require('../services/userService');
const UserAccess = require('../models/userAccessModel').UserAccess;
const User = require('../models/userModel').User;
const _ = require('lodash');

let model = module.exports;

model.getClient =  (clientId, clientSecret, next) =>{
    OAuthClient.findOne({
        clientId,
        clientSecret
    }).then(function (client) {
        return next(false, clientId);
    }).catch(function (err) {
        console.log(err);
        console.log('invalid client');
        return next();
    });
};

model.grantTypeAllowed =  (clientId, grantType, next) => {
    if (['password'].indexOf(grantType) !== -1) {
        return next(false, true);
    }
};

model.getUser =  (username, password, next) => {

    let $or = [];
    $or.push({
        enrolment: username
    });

    $or.push({
        email: username.toLowerCase()
    });

    User.findOne({
        $or: $or,
        status: true
    }).then(function (user) {
        if (!user)
            return next();

        if (!UserService.validPassword(user.password, password))
            return next();

        return next(null, user._id);

    }).catch(function (err) {
        return next(err);
    });



};

model.saveAccessToken =  (token, clientId, expires, userId, next) => {
    let accessToken = new OAuthToken({
        accessToken: token,
        clientId,
        user: userId,
        expires
    });

    let invalidUserClient;

    User.findOne({
            _id: userId
        })
        .populate('oauthClients')
        .then(function (user) {
            if (!_.some(user.oauthClients, ['clientId', clientId])) {
                throw new Error('InvalidClient for this user');
            }

            return UserAccess.create({
                user: userId
            });
        })
        .then(function (userLog) {
            return accessToken.save();
        })
        .then(function (accessTokenSuccess) {
            next(null, accessTokenSuccess);
        })
        .catch(function (err) {
            next(err);
        });

};

model.getAccessToken =  (bearerToken, next) => {
    OAuthToken.findOne({
        accessToken: bearerToken
    }, next);
};
