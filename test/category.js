process.env.NODE_ENV = "test";

import { Category } from "../database/models";
import chai from "chai";
import chaiHttp from "chai-http";
import server from "../index";
const should = chai.should();

chai.use(chaiHttp);

describe("Categories", () => {
  beforeEach(done => {
    Category.destroy({
      where: {},
      truncate: true
    }).then(() => {
      done();
    });
  });

  describe("/GET Categories", () => {
    it("it should GET all categories", done => {
      chai
        .request(server)
        .get("/api/category")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
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
        .send(category)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.errors[0].param.should.eql("name");
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
        .send(category)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.name.should.eql(category.name);
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
        .send();

      response.should.have.status(200);
      response.body.should.be.a("object");
      response.body.should.have.property("name");
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
        .send({ name: "Category", description: "Description" });

      response.should.have.status(200);
      response.body.should.be.a("object");
      response.body.should.have.property("name").eql("Category");
      response.body.should.have.property("description").eql("Description");
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
        .delete("/api/category/" + data.id);

      response.should.have.status(200);
      response.body.should.be.a("object");
      response.body.should.have.property("msg").eql("Category removed");
    });
  });
});
