const chai = require("chai");
const should = chai.should();
const chaiHttp = require("chai-http");
const server = require("../server/index");
const axios = require("axios");

chai.use(chaiHttp);

const foo = "bar";

describe("GET", () => {
  it("should respond with status code 200", () => {
    chai
      .request(server)
      .get("/test")
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it("should respond with an array", () => {
    chai
      .request(server)
      .get("/test")
      .end((err, res) => {
        res.body.should.be.an("array");
        done();
      });
  });

  it("should contain 25 elements", () => {
    chai
      .request(server)
      .get("/test")
      .end((err, res) => {
        res.body.length.should.be(25);
        done();
      });
  });

  // it("should contain adventure objects with correct properties", () => {
  //   chai
  //     .request(server)
  //     .get("/test")
  //     .end((err, res) => {
  //       let adventure = res.body[0];
  //       console.log(res.body);
  //       adventure.should.be.an("object");
  //       adventure.should.have.property("title");
  //       adventure.should.have.property("image");
  //       adventure.should.have.property("description");
  //       adventure.should.have.property("price");
  //       done();
  //     });
  // });
});
