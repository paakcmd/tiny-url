const chai = require('chai');
const chaiHttp = require('chai-http');

const should = chai.should();
chai.use(chaiHttp);

const server = require('../server/bin/www.js');

const mochaTestPath = '/api/url/generate';


describe('GET /api/url/:id', () => {
    it('it should success when the inputs are correct and the result length equals to 8', done => {
        let requestPayload = {
            "url": "http://paakcmd.space",
            "expire": "1"
          };

        chai
            .request(server)
            .post(mochaTestPath)
            .send(requestPayload)
            .end((err, res) => {
                res.should.be.json;
                res.should.have.status(200);
                res.body.data.urlId.length.should.be.eql(8);
                done();
            });
    });

    it('it should success when the inputs are correct and the result matches the regex', done => {
        let requestPayload = {
            "url": "http://paakcmd.space",
            "expire": "1"
          };

          const regex = /[a-zA-Z0-9]{8}/

        chai
            .request(server)
            .post(mochaTestPath)
            .send(requestPayload)
            .end((err, res) => {
                res.should.be.json;
                res.should.have.status(200);
                res.body.data.urlId.length.should.be.eql(8);
                regex.test(res.body.data.urlId).should.be.eql(true);
                done();
            });
    });

    it('it should fail when user input invalid format url', done => {
        let requestPayload = {
            "url": "test",
            "expire": "1"
          };

        chai
            .request(server)
            .post(mochaTestPath)
            .send(requestPayload)
            .end((err, res) => {
                res.should.be.json;
                res.should.have.status(400);
                res.body.error.msg_key.should.be.eql("invalid_param");
                done();
            });
    });

    it('it should fail when expire is less than -1', done => {
        let requestPayload = {
            "url": "test",
            "expire": "-1"
          };

        chai
            .request(server)
            .post(mochaTestPath)
            .send(requestPayload)
            .end((err, res) => {
                res.should.be.json;
                res.should.have.status(400);
                res.body.error.msg_key.should.be.eql("invalid_param");
                done();
            });
    });

    it('it should fail when user did not input url', done => {
        let requestPayload = {
            "expire": "-1"
          };

        chai
            .request(server)
            .post(mochaTestPath)
            .send(requestPayload)
            .end((err, res) => {
                res.should.be.json;
                res.should.have.status(400);
                res.body.error.msg_key.should.be.eql("missing_param");
                done();
            });
    });

    it('it should fail when user did not input expire', done => {
        let requestPayload = {
            "expire": "-1"
          };

        chai
            .request(server)
            .post(mochaTestPath)
            .send(requestPayload)
            .end((err, res) => {
                res.should.be.json;
                res.should.have.status(400);
                res.body.error.msg_key.should.be.eql("missing_param");
                done();
            });
    });

    it('it should fail when the database error', done => {
        let requestPayload = {
            "url": "http://dberror.com",
            "expire": "-1"
          };

        chai
            .request(server)
            .post(mochaTestPath)
            .send(requestPayload)
            .end((err, res) => {
                res.should.be.json;
                res.should.have.status(500);
                res.body.error.msg_key.should.be.eql("database_error");
                done();
            });
    });

    


    

});
