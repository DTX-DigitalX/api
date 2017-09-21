'use strict';

const _ = require('lodash');
const Event = require('../models/eventModel').Event;
const MongoService = require('../services/mongoService');

class EventRepository {

    async findById(eventId) {
        return await Event.findById(eventId);
    }

    async findAll() {
        return await Event.find()
        .sort('order:1')
            .lean();
    }

    async create(event) {
        return await Event.create(event);
    }

    async update(newEvent) {
        let event = await this.findById(newEvent._id);

        if (!event)
            throw new Error("evento não encontrado para fazer alteração");

        event.youTubeHash = newEvent.youTubeHash;
        await event.save();

       return event;

    }

}

module.exports = new EventRepository();
