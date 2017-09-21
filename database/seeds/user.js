'use strict';

const _ = require('lodash');
const User = require('../../src/models/userModel').User;
const UserService = require('../../src/services/userService');

module.exports = (accessProfile, oauthClients) => (
    [
        new User({
            name: 'Usuário Teste ',
            email: 'app@dtx.com.br',
            phone: '11-999999999',
            document: '123456',
            password: UserService.generateHash('123456'),
            enrolment: '102030',
            status: true,
            isFullRegister: true,
            accessProfile: accessProfile[0],
            oauthClients: [_.find(oauthClients, oauthClient => oauthClient.clientId === 'app')]
        })
    ]
);
