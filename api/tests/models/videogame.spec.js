const { Videogame, conn } = require('../../src/db.js');
const { expect } = require('chai');
const { v4: uuidv4 } = require('uuid');

describe('Videogame model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Videogame.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        const id = uuidv4();
        Videogame.create({
          id: id,
          platforms: ['Playstation 4', 'PC', 'Xbox'],
          description_raw: 'testing this new Videogame',
        })
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });

      it("should throw an error if description is null", (done) => {
        const id = uuidv4();
        Videogame.create({
          id: id,
          name: "Super Mario Bros",
          platforms: ['Playstation 4', 'PC', 'Xbox'],
        })
          .then(() => done(new Error("It requires a valid flag")))
          .catch(() => done());
      });

      it("should throw an error if id is null", (done) => {
        Videogame.create({
          name: "Super Mario Bros",
          platforms: ['Playstation 4', 'PC', 'Xbox'],
          description_raw: 'testing this new Videogame',
        })
          .then(() => done(new Error("It requires a valid ID")))
          .catch(() => done());
      });

      it('should work when all parameters are passed in', () => {
        const id = uuidv4();
        Videogame.create({ 
          id: id,
          name: 'Super Mario Bros',
          description_raw: 'testing this new Videogame',
          platforms: ['Playstation 4', 'PC', 'Xbox'],
       });
      });

    });
  });
});
