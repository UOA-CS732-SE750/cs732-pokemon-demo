import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { Pokemon } from "../../../db/pokemon-schema.js";
import express from "express";
import request from "supertest";
import routes from "../pokemon.js";

let mongod;

const app = express();
app.use(express.json());
app.use('/', routes);

const dragonite = {
    _id: new mongoose.Types.ObjectId('000000000000000000000001'),
    species: 149,
    name: 'Dragonite',
    originalName: 'Dragonite',
    image: 'https://placekitten.com/200/300'
}

const charmander = {
    _id: new mongoose.Types.ObjectId('000000000000000000000002'),
    species: 4,
    name: 'Charmander',
    originalName: 'Charmander',
    image: 'https://placekitten.com/200/300'
}

const celebi = {
    _id: new mongoose.Types.ObjectId('000000000000000000000003'),
    species: 251,
    name: 'Celebi',
    originalName: 'Celebi',
    image: 'https://placekitten.com/200/300'
}

const pokemons = [dragonite, charmander, celebi];

beforeAll(async () => {

    mongod = await MongoMemoryServer.create();

    const connectionString = mongod.getUri();
    await mongoose.connect(connectionString, { useNewUrlParser: true });

});

beforeEach(async () => {

    await Pokemon.deleteMany({});
    await Pokemon.insertMany(pokemons);

});

afterAll(async () => {
    await mongoose.disconnect();
    await mongod.stop();
});

test('getting one pokemon works successfully', (done) => {
    request(app)
        .get('/000000000000000000000002')
        .send()
        .expect(200)
        .end((err, res) => {

            if (err) return done(err);

            const fromApi = res.body;
            expectPokemon(fromApi, charmander);

            return done();
        })
});

test('getting nonexistant pokemon returns 404', (done) => {
    request(app)
        .get('/000000000000000000000009')
        .send()
        .expect(404, done);
});

test('changing nickname works fine', (done) => {
    request(app)
        .patch('/000000000000000000000002')
        .send({ name: 'Prince Zuko' })
        .expect(204)
        .end((err, res) => {

            if (err) return done(err);

            Pokemon.findById('000000000000000000000002')
                .then(pokemon => {
                    expect(pokemon.name).toEqual('Prince Zuko');
                    done();
                });
        })
});

function expectPokemon(actual, expected, checkId = true) {
    if (checkId) expect(actual._id).toEqual(expected._id.toString());
    expect(actual.species).toBe(expected.species);
    expect(actual.name).toEqual(expected.name);
    expect(actual.originalName).toEqual(expected.originalName);
    expect(actual.image).toEqual(expected.image);
}