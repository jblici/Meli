/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Videogame, conn } = require('../../src/db.js');
const { v4: uuidv4 } = require('uuid');


const agent = session(app);
const id = uuidv4();
const videogame = {
  name: 'Super Mario Bros',
  id: id,
  description_raw: 'testing this new Videogame',
  platforms: ['Playstation 4', 'PC', 'Xbox'],
};

describe('Videogame routes', () => {
  before(() => conn.authenticate().catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Videogame.sync({ force: true }).then(() => Videogame.create(videogame)));
  describe('GET /videogames', () => {

    it("should get 200 if you search for a valid query", () =>
      agent.get("/videogames?name=portal").expect(200));

    it("should get 200 if you search for a valid id /videogames/:id", () =>
      agent.get("/videogames/3498").expect(200));
  });
});
