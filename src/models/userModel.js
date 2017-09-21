'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AccessProfileSchema = require('./accessProfileModel').AccessProfileSchema;
const idValidator = require('mongoose-id-validator');

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    photo:{
        type: String,
        required: false
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        index: {
            unique: true,
            partialFilterExpression: {
                email: {
                    $type: 'string'
                }
            }
        }
    },
    phone: {
        type: String
    },
    document: {
        type: String,
        required: true,
        index: {
            unique: true
        }
    },
    enrolment: {
        type: String,
        required: true,
        index: {
            unique: true
        }
    },
    status: {
        type: Boolean,
        default: false
    },
    isFullRegister: {
        type: Boolean,
        default: false
    },
    registerDate: {
        type: Date,
        default: Date.now
    },
    disableDate: {
        type: Date
    },
    password: {
        type: String,
        required: true,
    },
    accessProfile: AccessProfileSchema,
    oauthClients: [{
        type: Schema.Types.ObjectId,
        ref: 'OAuthClient'
    }]
});

//UserSchema.index({ email: 1, document: 1 }, { unique: true });
UserSchema.index({
    'name': 1
}, {
    document: 1
});
UserSchema.plugin(idValidator);

module.exports.UserSchema = UserSchema;
module.exports.User = mongoose.model('User', UserSchema);
