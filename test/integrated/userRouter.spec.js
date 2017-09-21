var assert = require('assert');
var expect = require('chai').expect;
var should = require('chai').should();
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
var sinon = require('sinon');
var request = require('supertest');
var server = require('../../server').koa;
var app = server.listen(4000);

chai.use(chaiAsPromised);
chai.should();

describe('SignUp', function () {
    this.timeout(10000);

    let authToken;

    before('Prepare Integrated test for user', function (done) {

        request(app)
            .post('/oauth/token')
            .send('grant_type=password')
            .send('username=app@imagine.com.br')
            .send('password=123456')
            .send('client_id=app')
            .send('client_secret=app@imagine')
            .expect(200)
            .end((error, response) => {
                if (error) {
                    return done(error);
                }
                authToken = response.body;
                done();
            })

    })

    it('/api/user creates user ok', function (done) {

        request(app)
            .post('/api/user')
            .set('Authorization', `Bearer ${authToken.access_token}`)
            .send({
                "name": "Usuário Teste Imagine",
                "email": "carlos.junior@imagine.com.br",
                "phone": "11-999999999",
                "document": "6543233188",
                "enrolment": "302010447",
                "status": true
            })
            .expect(200)
            .end((error, response) => {
                if (error) {
                    return done(error);
                }
                response.body.name.should.be.a.string;
                done();
            })

    });

});
