process.env.NODE_ENV = "test";

import chai from "chai";
import chaiHttp from "chai-http";
import server from "../../index";
import {
  User,
  TouristAttractions,
  TouristGallery
} from "../../database/models";

const expect = chai.expect;

chai.use(chaiHttp);

let jwtToken = "";

describe("Tourist Gallery", () => {
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
    });

    const TouristAttraction = await TouristAttractions.findOne();

    TouristGallery.create({
      title: "Entry Gate",
      touristAttractionId: TouristAttraction.id
    });
  });

  describe("/GET Tourist Gallery", () => {
    it("it should Get all tourist gallery", done => {
      chai
        .request(server)
        .get("/api/tourist-gallery")
        .set("x-auth-token", jwtToken)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res).to.be.a("object");
          done();
        });
    });
  });

  describe("/GET/:id Tourist Gallery", () => {
    it("it should get a tourist gallery by the given id", async () => {
      const data = await TouristGallery.findOne();

      const res = await chai
        .request(server)
        .get("/api/tourist-gallery/" + data.id)
        .set("x-auth-token", jwtToken)
        .send();

      expect(res).to.have.status(200);
      expect(res.body).to.be.a("object");
      expect(res.body)
        .to.have.property("title")
        .to.equal(data.title);
    });
  });

  describe("/POST tourist gallery", () => {
    it("it should post tourist gallery", async () => {
      const TouristAttraction = await TouristAttractions.findOne();

      let data = {
        title: "New Entry Gate",
        touristAttractionId: TouristAttraction.id
      };

      const res = await chai
        .request(server)
        .post("/api/tourist-gallery")
        .send(data)
        .set("x-auth-token", jwtToken);

      expect(res).to.have.status(200);
      expect(res).to.be.a("object");
    });
  });

  describe("/PUT/:id Tourist Attraction", () => {
    it("it should Update a gallery given id", async () => {
      const data = await TouristGallery.findOne();
      data.title = "Update new title";

      console.log(data.id);

      const res = await chai
        .request(server)
        .put("/api/tourist-gallery/" + data.id)
        .send({
          title: data.title,
          touristAttractionId: data.touristAttractionId
        })
        .set("x-auth-token", jwtToken);

      console.log(res.body);

      expect(res).to.have.status(200);
      expect(res.body).to.be.a("object");
      expect(res.body)
        .to.have.property("title")
        .to.equal(data.title);
    });
  });

  //   describe("/DELETE/:id Tourist Gallery", () => {
  //     it("it should Delete a gallery given id", async () => {
  //       const data = await TouristGallery.();

  //       const res = await chai
  //         .request(server)
  //         .delete("/api/tourist-gallery/" + data.id)
  //         .set("x-auth-token", jwtToken);

  //       expect(res).to.have.status(200);
  //       expect(res.body).to.be.a("object");
  //       expect(res.body).to.have.property("msg");
  //     });
  //   });
});
