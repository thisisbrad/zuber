const assert = require("assert");
const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../../app");

const Driver = mongoose.model("driver");

describe("Driver controller", () => {
  // method > route > result
  it("POST to /api/drivers creates a new driver", async () => {
    // get count of drivers
    // add this
    const count = await Driver.count();

    // send POST request with email for new driver
    await request(app)
      .post("/api/drivers")
      .send({ email: "test@driver.com" });

    // get count after saving new driver
    const newCount = await Driver.count();
    assert(count + 2 === newCount);
  });

  it("PUT to /api/drivers edits an existing driver", done => {
    // create driver for test
    const email = "test@driver.com";
    const driver = new Driver({ email, driving: false });
    // edit driver
    driver.save().then(() => {
      // hit database for driver
      request(app)
        .put(`/api/drivers/${driver._id}`)
        .send({ driving: true })
        .end(() => {
          // update deriver status
          Driver.findOne({ email }).then(driver => {
            //
            assert(driver.driving === true);
            done();
          });
        });
    });
  });

  it("DELETE to /api/driver removes a driver", done => {
    const driver = new Driver({ email: "test@driver.com" });

    driver.save().then(() => {
      request(app)
        .delete(`/api/drivers/${driver._id}`)
        .end(() => {
          Driver.findOne({ email: "test@driver.com" }).then(driver => {
            assert(driver === null);
            done();
          });
        });
    });
  });

  it("Get to /api/drivers finds drivers in a location", done => {
    const seattleDriver = new Driver({
      email: "seattle@test.com",
      geometry: { type: "Point", coordinates: [-122.4759902, 47.6147628] }
    });
    const miamiDriver = new Driver({
      email: "miami@test.com",
      geometry: { type: "Point", coordinates: [-80.2534507, 25.791581] }
    });

    Promise.all([seattleDriver.save(), miamiDriver.save()]).then(() => {
      request(app)
        .get("/api/drivers?lng=-80&lat=25")
        .end((err, response) => {
          assert(response.body.length === 1);
          assert(response.body[0].email === "miami@test.com");
          done();
        });
    });
  });
});
