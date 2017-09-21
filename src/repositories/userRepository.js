'use strict';

const _ = require('lodash');
const User = require('../models/userModel').User;
const MongoService = require('../services/mongoService');

class UserRepository {

    async findOne(user) {
        return await User.findById(user._id);
    }

    async find(name, enrolment) {
        let $or = [];
        if (name) {
            $or.push({
                'name': MongoService.regexExpression(name)
            });
        }

        if (enrolment) {
            $or.push({
                'enrolment': MongoService.regexExpression(enrolment)
            });
        }
        return await User.find({
            $or: $or,
            status: true
        }).select('-password')
            .sort({ name: 1 })
            .lean();
    }

    async findAll() {
        return await User.find()
            .select('-password')
            .lean();
    }

    async findOneByEmail(email) {
        return await User.findOne({
            email
        })
        .select('name email photo -_id')
        .lean();
    }

    async findOneByEnrolment(enrolment) {
        return await User.findOne({
            enrolment
        });
    }

    async create(user) {
        return await User.create(user);
    }

    async changeUserStatus(user, status) {
        user.status = status;
        await user.save();

        let result = await User.findById(user._id).lean();
        delete result.password;
        return result;
    }

    async update(newUser) {
        let user = await User.findById(newUser._id);

        if (!user)
            throw new Error("usuario não encontrado para fazer alteração");

        if (newUser.hasOwnProperty('password'))
            user.password = newUser.password;
        user.status = newUser.status;
        user.isFullRegister = newUser.status;
        user.phone = newUser.phone;
        user.email = newUser.email;
        user.photo = newUser.photo;
        await user.save();

        let result = await User.findById(newUser._id).lean();
        delete result.password;
        return result;
    }

}

module.exports = new UserRepository();
