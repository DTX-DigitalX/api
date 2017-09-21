'use strict';

const Event = require('../../src/models/eventModel').Event;

module.exports = () => (
    [
        new Event({
            dia: "16/10",
            horaInicio: "19:00",
            horaFim: "21:50",
            tema: "Cultura da Inovação",
            apresentadores: [{
                nome: "Koji"
            }, {
                nome: "Bruno"
            }],
            order:1
        }),
        new Event({
            dia: "16/10",
            horaInicio: "19:00",
            horaFim: "21:50",
            tema: "Cultura Digital",
            apresentadores: [{
                nome: "Koji"
            }, {
                nome: "Bruno"
            }],
            order:2
        }),
        new Event({
            dia: "17/10",
            horaInicio: "12:00",
            horaFim: "13:50",
            tema: "Jornada do consumidor ",
            apresentadores: [{
                nome: "Theo"
            }, {
                nome: "Renata Braga"
            }],
            order:3
        }),
        new Event({
            dia: "17/10",
            horaInicio: "12:00",
            horaFim: "13:50",
            tema: "Inovando de fora para dentro",
            apresentadores: [{
                nome: "Theo"
            }, {
                nome: "Renata Braga"
            }],
            order:4
        }),
        new Event({
            dia: "18/10",
            horaInicio: "11:00",
            horaFim: "12:50",
            tema: "Smart Home",
            apresentadores: [{
                nome: "Tobara"
            }, {
                nome: "Domingos"
            }],
            order:5
        }),
        new Event({
            dia: "18/10",
            horaInicio: "11:00",
            horaFim: "12:50",
            tema: "IOT",
            apresentadores: [{
                nome: "Tobara"
            }, {
                nome: "Domingos"
            }],
            order:6
        }),
        new Event({
            dia: "19/10",
            horaInicio: "11:00",
            horaFim: "12:50",
            tema: "Industria 4.0",
            subtema: "Case florestal drones e apontamento",
            apresentadores: [{
                nome: "Daniel Pessoa"
            }],
            order:7
        }),
        new Event({
            dia: "20/10",
            horaInicio: "11:00",
            horaFim: "12:50",
            tema: "Painel Núcleo de Inovação",
            apresentadores: [{
                nome: "Membros do Núcleo"
            }],
            order:8
        }),
        new Event({
            dia: "20/10",
            horaInicio: "13:00",
            horaFim: "18:50",
            tema: "Hackathon Madeira",
            apresentadores: [{
                nome: "Gabriela"
            }],
            order:9
        })

    ]
);
