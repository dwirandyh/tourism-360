process.env.NODE_ENV = "test";

import { Category } from "../database/models";
import chai from "chai";
import chaiHttp from "chai-http";
import server from "../../index";
import { User } from "../database/models";

const expect = chai.expect;

chai.use(chaiHttp);

let jwtToken = "";

describe("Categories", () => {
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

  describe("/GET Categories", () => {
    it("it should GET categories with pagination", done => {
      chai
        .request(server)
        .get("/api/category")
        .set("x-auth-token", jwtToken)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.a("object");
          done();
        });
    });

    it("it shluld get all categories", done => {
      chai
        .request(server)
        .get("/api/category/all")
        .set("x-auth-token", jwtToken)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.a("object");
          done();
        });
    });
  });

  describe("/POST Category", () => {
    it("it should not post category without name", done => {
      let category = {
        description: "Kategori wisata alam"
      };

      chai
        .request(server)
        .post("/api/category")
        .set("x-auth-token", jwtToken)
        .send(category)
        .end((err, res) => {
          console.log(res.body);
          expect(res).to.have.status(400);
          expect(res.body.errors[0].param).to.equal("name");
          //res.body.errors[0].param.should.eql("name");
          done();
        });
    });

    it("it should post category", done => {
      let category = {
        name: "New Category Test",
        description: "New description test"
      };

      chai
        .request(server)
        .post("/api/category")
        .set("x-auth-token", jwtToken)
        .send(category)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.name).to.equal(category.name);
          done();
        });
    });
  });

  describe("/GET/:id category", () => {
    it("it should GET a category by the give id", async () => {
      const data = await Category.create({
        name: "New Category Test",
        description: "New Description Test"
      });

      const response = await chai
        .request(server)
        .get("/api/category/" + data.id)
        .set("x-auth-token", jwtToken)
        .send();

      console.log("/api/category/" + data.id);
      console.log(response.body);

      expect(response).to.have.status(200);
      expect(response.body).to.be.a("object");
      expect(response.body).to.have.property("name");
      // response.should.have.status(200);
      // response.body.should.be.a("object");
      // response.body.should.have.property("name");
    });
  });

  describe("/PUT/:id category", () => {
    it("it should Update a category given the id", async () => {
      const data = await Category.create({
        name: "New Category Test",
        description: "New Description Test"
      });

      const response = await chai
        .request(server)
        .put("/api/category/" + data.id)
        .set("x-auth-token", jwtToken)
        .send({ name: "Category", description: "Description" });

      expect(response).to.have.status(200);
      expect(response.body).to.be.a("object");
      expect(response.body)
        .to.have.property("name")
        .to.equal("Category");
      expect(response.body)
        .to.have.property("description")
        .to.equal("Description");
    });
  });

  describe("/DELETE/:id category", () => {
    it("it should Delete a category given the id", async () => {
      const data = await Category.create({
        name: "New Category Test",
        description: "New Description Test"
      });

      const response = await chai
        .request(server)
        .delete("/api/category/" + data.id)
        .set("x-auth-token", jwtToken);

      expect(response).to.have.status(200);
      expect(response.body).to.be.a("object");
      expect(response.body)
        .to.have.property("msg")
        .to.equal("Category removed");
    });
  });
});
