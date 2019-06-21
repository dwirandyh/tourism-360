process.env.NODE_ENV = "test";

import { TouristAttractions } from "../../database/models";
import chai from "chai";
import chaiHttp from "chai-http";
import server from "../../index";
import { User } from "../../database/models";

const expect = chai.expect;

chai.use(chaiHttp);

let jwtToken = "";

describe("Tourist Attraction", () => {
  before(async () => {
    const user = await User.findOne();
    const payload = {
      user: {
        id: user.id
      }
    };

    User.jwtToken(payload, (err, token) => {
      if (err) throw err;
      jwtToken = token;
      done();
    });
  });

  describe("/GET Tourst Attraction", () => {
    it("it should GET all tourist attractions", done => {
      chai
        .request(server)
        .get("/api/tourist-attraction")
        .set("x-auth-token", jwtToken)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.a("object");
          done();
        });
    });
  });

  describe("/POST Tourst Attraction", () => {
    it("it should not post tourist attraction without name", done => {
      let data = {
        description: "Kategori wisata alam"
      };

      chai
        .request(server)
        .post("/api/tourist-attraction")
        .set("x-auth-token", jwtToken)
        .send(data)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.errors[0].param).to.equal("name");
          done();
        });
    });

    it("it should post Tourst Attraction", done => {
      let data = {
        name: "New Name",
        address: "New address",
        shortDescription: "new short description",
        description: "New description",
        latitude: "2321412",
        longitude: "123242"
      };

      chai
        .request(server)
        .post("/api/tourist-attraction")
        .set("x-auth-token", jwtToken)
        .send(data)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.name).to.equal(data.name);
          done();
        });
    });
  });

  describe("/GET/:id Tourst Attraction", () => {
    it("it should GET a Tourst Attraction by the give id", async () => {
      const data = await TouristAttractions.create({
        name: "New Name",
        address: "New address",
        shortDescription: "new short description",
        description: "New description",
        latitude: "2321412",
        longitude: "123242"
      });

      const response = await chai
        .request(server)
        .get("/api/tourist-attraction/" + data.id)
        .set("x-auth-token", jwtToken)
        .send();

      expect(response).to.have.status(200);
      expect(response.body).to.be.a("object");
      expect(response.body).to.have.property("name");
    });
  });

  describe("/PUT/:id Tourst Attraction", () => {
    it("it should Update a category given the id", async () => {
      const data = await TouristAttractions.create({
        name: "New Name",
        address: "New address",
        shortDescription: "new short description",
        description: "New description",
        latitude: "23214",
        longitude: "1232"
      });

      const response = await chai
        .request(server)
        .put("/api/tourist-attraction/" + data.id)
        .set("x-auth-token", jwtToken)
        .send({
          name: "New Name update",
          address: "New address update",
          shortDescription: "new short description update",
          description: "New description update",
          latitude: "23214",
          longitude: "1232"
        });

      expect(response).to.have.status(200);
      expect(response.body).to.be.a("object");
      expect(response.body)
        .to.have.property("name")
        .to.equal("New Name update");
      expect(response.body)
        .to.have.property("description")
        .to.equal("New description update");
    });
  });

  describe("/DELETE/:id Tourst Attraction", () => {
    it("it should Delete a category given the id", async () => {
      const data = await TouristAttractions.findOne();

      const response = await chai
        .request(server)
        .delete("/api/tourist-attraction/" + data.id)
        .set("x-auth-token", jwtToken);

      expect(response).to.have.status(200);
      expect(response.body).to.be.a("object");
      expect(response.body)
        .to.have.property("msg")
        .to.equal("Tourist attraction removed");
    });
  });
});
