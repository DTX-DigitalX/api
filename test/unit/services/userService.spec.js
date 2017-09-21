var assert = require('assert');
var expect = require('chai').expect;
var should = require('chai').should();
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
var sinon = require('sinon');

chai.use(chaiAsPromised);
chai.should();

var OAuthClient = require('../../../src/models/oAuthClientModel').OAuthClient;
var userRepository = require('../../../src/repositories/userRepository');
var userService = require('../../../src/services/userService');


describe('Unit - UserService.Create', function () {

    it("Create New User Without Password and Password need to be equals to Document", async() => {


        userRepository.findOneByEnrolment = sinon.stub().returns(null);
        userRepository.changeUserStatus = sinon.stub().returns(null);
        userRepository.create = sinon.stub().returnsArg(0)
        OAuthClient.findOne = sinon.stub().returns('id oauth client');
        userService.generateHash = sinon.stub().returnsArg(0);


        let user = await userService.create({
            name: 'teste',
            document: '102030'

        });

        userRepository.findOneByEnrolment.calledOnce.should.be.true;
        userRepository.changeUserStatus.notCalled.should.be.true;
        OAuthClient.findOne.calledOnce.should.be.true;
        userRepository.create.calledOnce.should.be.true;

        user.should.have.property('password');
        user.password.should.to.equal(user.document);

    });

    it('Create User with password and document')

    it("Create New User Without Password and Without Document Should be rejected", async function () {

        await userService.create({
            name: 'teste'

        }).should.to.eventually.be.rejectedWith('Senha ou Documento deve estar preenchido')


    });


})
