'use strict';

const OAuthClient = require('../models/oAuthClientModel').OAuthClient;
const OAuthToken = require('../models/oAuthTokenModel').OAuthToken;
const UserRepository = require('../repositories/userRepository');
const EmailService = require('../services/emailService');
const bcrypt = require('bcryptjs');
const randomstring = require('randomstring');

class UserService {

    async create(user) {

        if (!user.document  && !user.password)
            throw new Error('Senha ou Documento deve estar preenchido');


        if (!user.hasOwnProperty('password'))
            user.password = this.generateHash(user.document);
        else
            user.password = this.generateHash(user.password);

        let userExists = await UserRepository.findOneByEnrolment(user.enrolment);

        if (userExists)
            throw 'Usuário já existente na base';

        let clientOauth = await OAuthClient.findOne({
            'clientId': 'app'
        });

        user.oauthClients = [clientOauth._id];

        let createdUser = await UserRepository.create(user);

        return createdUser;
    }

    async passwordReset(email) {

        let user = await UserRepository.findOneByEmail(email);

        if (!user) {
            throw new Error('Usuário não encontrado');
        }

        let newTemporayPassword = randomstring.generate({
            length: 6,
            charset: 'alphabetic',
            capitalization: 'lowercase'
        });

        let hashNewPassword = this.generateHash(newTemporayPassword);

        user.password = hashNewPassword;
        user.forceToChangePassword = true;


        await user.save();

        let msg = 'Nova Senha<br><strong style="font-size:22px">' + newTemporayPassword + '</strong>';

        await EmailService.sendNotificationEmail(user.email, user.name, 'Sua senha foi alterada!', msg);

    }


    async find(name, enrolment) {
        let users = await UserRepository.find(name, enrolment);
        return users;
    }

    async findByEmail(email) {
        let user = await UserRepository.findOneByEmail(email);

        if (!user)
            throw new Error('Usuário não encontrado');

        return user;
    }

    async verifyEmail(email) {
        let user = await UserRepository.findOne(email);
        return user ? true : false;
    }

    async logout(token) {
        return await OAuthToken.remove({
            accessToken: token
        });
    }

    generateHash(password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    }

    validPassword(hash, password) {
        return bcrypt.compareSync(password, hash);
    }

    async update(user) {

        if (user.hasOwnProperty('password'))
            user.password = this.generateHash(user.password);

        return await UserRepository.update(user);
    }

}

module.exports = new UserService();
