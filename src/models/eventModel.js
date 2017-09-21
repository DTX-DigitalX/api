'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({
    dia: {
        type: String,
        required: true
    },
    horaInicio: {
        type: String,
        required: true
    },
    horaFim: {
        type: String,
        required: true
    },
    tema: {
        type: String,
        required: true
    },
    apresentadores: { type : Array , "default" : [] },
    order: {
        type: Number,
        required: true
    },
    youTubeHash: {
        type: String,
        required: false
    },
});

module.exports.EventSchema = EventSchema;
module.exports.Event = mongoose.model('Event', EventSchema);
