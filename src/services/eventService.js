'use strict';

const EventRepository = require('../repositories/eventRepository');


class EventService {

    async create(event) {
        return await EventRepository.create(event);
    }
    async findAll() {
        return await EventRepository.findAll();
    }

    async update(event) {
        return await EventRepository.update(event);
    }

}

module.exports = new EventService();
