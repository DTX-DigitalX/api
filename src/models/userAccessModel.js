'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const idValidator = require('mongoose-id-validator');

const UserAccessSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    date: {
        type: Date,
        default: new Date()
    }
});
UserAccessSchema.plugin(idValidator);

module.exports.UserAccessSchema = UserAccessSchema;
module.exports.UserAccess = mongoose.model('UserAccess', UserAccessSchema);
