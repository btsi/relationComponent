const chai = require("chai");
const should = chai.should();
const chaiHttp = require("chai-http");
const server = require("../server/index");
const axios = require("axios");

chai.use(chaiHttp);

const foo = "bar";

describe("GET /test", () => {
  it("should respond with status code 200", done => {
    chai
      .request(server)
      .get("/test")
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it("should respond with an object", done => {
    chai
      .request(server)
      .get("/test")
      .end((err, res) => {
        res.body.should.be.an("object");
        done();
      });
  });

  it("should contain an adventures array", done => {
    chai
      .request(server)
      .get("/test")
      .end((err, res) => {
        res.body.adventures.should.be.an("array");
        done();
      });
  });

  it("should contain adventure objects with correct properties", done => {
    chai
      .request(server)
      .get("/test")
      .end((err, res) => {
        let adventure = res.body.adventures[0];
        adventure.should.be.an("object");
        adventure.should.have.property("title");
        adventure.should.have.property("image");
        adventure.should.have.property("description");
        adventure.should.have.property("price");
        done();
      });
  });

  it("should contain a category object", done => {
    chai
      .request(server)
      .get("/test")
      .end((err, res) => {
        res.body.category.should.be.an("object");
        done();
      });
  });
});
