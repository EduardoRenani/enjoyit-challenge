//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Partner = require('../src/models/Partner');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../src/index');
let should = chai.should();

chai.use(chaiHttp);

describe('Partners', () => {


    
    /*
    * Test the /GET route
    */
    describe("Given the list of participants is empty", () => {
        
        beforeEach((done) => { //Before test we empty the database
            Partner.deleteMany({}, (err) => { 
               done();           
            });        
        });

        describe('When retrieving partners', () => {
            it('Then it should GET zero partners', (done) => {
                chai.request(server)
                    .get('/partners')
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.an('array');
                        res.body.length.should.be.eql(0);
                    done();
                    });
            });
        });
        describe('When inserting a partner with alphanumeric name', () => {
            it('it should return a error: invalid name input', (done) => {
                let partner = {
                    "name": "Roberto10",
                    "surname": "Silva",
                    "participation": "100.0"
                }
                chai.request(server)
                    .post('/partners')
                    .send(partner)
                    .end((err, res) => {
                        res.should.have.status(400);
                        res.body.should.be.a('object');
                        res.body.name.should.be.an('array');
                        res.body.name[0].should.equal("Name input is not a valid name");
                    done();
                    });
            });   
        });
    
        describe('when inserting a partner with alphanumeric surname', () => {
            it('it should return a error: invalid surname input', (done) => {
                let partner = {
                    "name": "Roberto",
                    "surname": "Silva222",
                    "participation": "100.0"
                }
                chai.request(server)
                    .post('/partners')
                    .send(partner)
                    .end((err, res) => {
                        res.should.have.status(400);
                        res.body.should.be.a('object');
                        res.body.surname.should.be.an('array');
                        res.body.surname[0].should.equal("Surname input is not a valid surname");
                    done();
                    });
            });   
        });
    
        describe('When inserting a partner with participation quota greater than 100%', () => {
            let partner = {
                "name": "Roberto",
                "surname": "Silva",
                "participation": "100.1"
            }
            it('it should return a error: invalid participation input', (done) => {
                chai.request(server)
                    .post('/partners')
                    .send(partner)
                    .end((err, res) => {
                        res.should.have.status(400);
                        res.body.should.be.a('object');
                        res.body.participation.should.be.an('array');
                        res.body.participation[0].should.equal("Participation input is not a valid percentage number");
                    done();
                    });
            });   
        });

        describe('When inserting a partner with participation quota less than or equal to 0% ', () => {
            let partner = {
                "name": "Roberto",
                "surname": "Silva",
                "participation": "0"
            }
            it('it should return a error: invalid participation input', (done) => {
                chai.request(server)
                    .post('/partners')
                    .send(partner)
                    .end((err, res) => {
                        res.should.have.status(400);
                        res.body.should.be.a('object');
                        res.body.participation.should.be.an('array');
                        res.body.participation[0].should.equal("Participation input is not a valid percentage number");
                    done();
                    });
            });   
        });
    
    });

    
    
    describe("Given the database is empty", () => {

        before((done) => { //Before test we empty the database
            Partner.deleteMany({}, (err) => { 
               done();           
            });        
        });

        describe("When inserting a valid partner", () => {
            let partner = {
                "name": "Roberto",
                "surname": "Silva",
                "participation": "5.0"
            }
            it("Then it should return a status 200", (done) => {
                chai.request(server)
                    .post('/partners')
                    .send(partner)
                    .end((err, res) => {
                        res.should.have.status(200);
                    done();
                    });
            });
            it("And it should return a list of 1 partner", (done) => {
                chai.request(server)
                    .get('/partners')
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('array');
                        res.body.length.should.be.equal(1);
                    done();
                    })
            });
        });
    });



});