const chai = require('chai');
const chaiHttp = require('chai-http');

const should = chai.should();
chai.use(chaiHttp);

const server = require('../server/bin/www.js');

const mochaTestPath = '/api/url';


describe('GET /api/url/:id', () => {
    it('it should success when the inputs are correct and the record is not expired', done => {
        
        chai
            .request(server)
            .get(`${mochaTestPath}/SHBeznzF`)
            .end((err, res) => {
                res.should.be.json;
                res.should.have.status(200);
                res.body.data.url.should.be.eql("http://paakcmd.space");
                done();
            });
    });

    it('it should success when the inputs are correct and the expire time is -1', done => {
        
        chai
            .request(server)
            .get(`${mochaTestPath}/neverexp`)
            .end((err, res) => {
                res.should.be.json;
                res.should.have.status(200);
                res.body.data.url.should.be.eql("http://paakcmd.space");
                done();
            });
    });

    it('it should fail when the url is expired', done => {
        
        chai
            .request(server)
            .get(`${mochaTestPath}/expire01`)
            .end((err, res) => {
                res.should.be.json;
                res.should.have.status(400);
                res.body.error.msg_key.should.be.eql("expired");
                done();
            });
    });

    it('it should fail when urlId length is less than 8', done => {
        
        chai
            .request(server)
            .get(`${mochaTestPath}/1234567`)
            .end((err, res) => {
                res.should.be.json;
                res.should.have.status(400);
                res.body.error.msg_key.should.be.eql("invalid_param");
                done();
            });
    });

    it('it should fail when urlId length is more than 8', done => {
        
        chai
            .request(server)
            .get(`${mochaTestPath}/123456789`)
            .end((err, res) => {
                res.should.be.json;
                res.should.have.status(400);
                res.body.error.msg_key.should.be.eql("invalid_param");
                done();
            });
    });

    it('it should fail when urlId is undefined', done => {
        
        chai
            .request(server)
            .get(`${mochaTestPath}/undefined`)
            .end((err, res) => {
                res.should.be.json;
                res.should.have.status(400);
                res.body.error.msg_key.should.be.eql("invalid_param");
                done();
            });
    });

    it('it should fail when urlId is null', done => {
        
        chai
            .request(server)
            .get(`${mochaTestPath}/null`)
            .end((err, res) => {
                res.should.be.json;
                res.should.have.status(400);
                res.body.error.msg_key.should.be.eql("invalid_param");
                done();
            });
    });

    it('it should fail when record is not found', done => {
        
        chai
            .request(server)
            .get(`${mochaTestPath}/notfound`)
            .end((err, res) => {
                res.should.be.json;
                res.should.have.status(404);
                res.body.error.msg_key.should.be.eql("not_found");
                done();
            });
    });

    it('it should fail when database error', done => {
        
        chai
            .request(server)
            .get(`${mochaTestPath}/dberror1`)
            .end((err, res) => {
                res.should.be.json;
                res.should.have.status(500);
                res.body.error.msg_key.should.be.eql("database_error");
                done();
            });
    });


    

});
