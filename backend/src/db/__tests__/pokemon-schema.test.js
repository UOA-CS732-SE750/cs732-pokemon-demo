import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { Pokemon } from "../pokemon-schema";

let mongod;

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

    await mongoose.connection.db.dropDatabase();
    const coll = await mongoose.connection.db.createCollection('pokemons');
    await coll.insertMany(pokemons);

});

afterAll(async () => {
    await mongoose.disconnect();
    await mongod.stop();
});

test('Getting all info from the Pokemon collection is succesful', async () => {
    const fromDb = await Pokemon.find();

    expect(fromDb.length).toBe(3);

    expectPokemon(fromDb[0], dragonite);
    expectPokemon(fromDb[1], charmander);
    expectPokemon(fromDb[2], celebi);

})

test('Getting single pokemon is successful', async () => {
    const fromDb = await Pokemon.findById('000000000000000000000002');
    expectPokemon(fromDb, charmander);
})

test('Getting nonexistant pokemon returns undefined', async () => {
    const fromDb = await Pokemon.findById('000000000000000000000009');
    expect(fromDb).toBeNull();
})

test('Deleting a pokemon is successful', async () => {
    await Pokemon.deleteOne({ _id: '000000000000000000000002' });
    const fromDb = await Pokemon.findById('000000000000000000000002');
    expect(fromDb).toBeNull();
})

test('Adding a pokemon is successful', async () => {
    const mewtwo = {
        species: 150,
        name: 'Mewtwo',
        originalName: 'Mewtwo',
        image: 'https://placekitten.com/200/300'
    }

    const pokemon = new Pokemon(mewtwo);
    await pokemon.save();

    const fromDb = await Pokemon.findById(pokemon._id);
    expectPokemon(fromDb, mewtwo, false);
})

test('Adding pokemon with an undefined name fails', async () => {
    const mewtwo = {
        species: 150,
        originalName: 'Mewtwo',
        image: 'https://placekitten.com/200/300'
    }

    try {
        await new Pokemon(mewtwo).save();
        fail('Save should not have succeeded');
    }
    catch {
        // Allgood :)
    }
})

function expectPokemon(actual, expected, checkId = true) {
    if (checkId) expect(actual._id).toEqual(expected._id);
    expect(actual.species).toBe(expected.species);
    expect(actual.name).toEqual(expected.name);
    expect(actual.originalName).toEqual(expected.originalName);
    expect(actual.image).toEqual(expected.image);
}