import axios from 'axios';
import express from 'express';
import { Pokemon } from '../../db/pokemon-schema';

const router = express.Router();

// Create a pokemon with the given species, and sends it back in the given response.
async function createPokemon(species, res) {
    const url = `https://pokeapi.co/api/v2/pokemon/${species}`;
    try {
        const response = await axios.get(url);

        const pokemon = new Pokemon({
            species: parseInt(species),
            originalName: response.data.name,
            name: response.data.name,
            image: response.data.sprites.front_default
        });

        await pokemon.save();

        res.status(201).location(`/api/pokemon/${pokemon._id}`).json(pokemon);
    }
    catch (err) {
        return res.sendStatus(422);
    }
}

// Create Pokemon by species
router.post('/', (req, res) => {

    const { species } = req.body;

    if (species === undefined) {
        return res.sendStatus(422);
    }

    createPokemon(species, res);
});

// Create Pokemon randomly
router.post('/random', (req, res) => {

    const species = Math.floor(Math.random() * 1008) + 1;

    createPokemon(species, res);
});

// Read single Pokemon
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    const pokemon = await Pokemon.findById(id);

    if (!pokemon) return res.sendStatus(404);

    res.json(pokemon);
});

// Read list of all Pokemon
router.get('/', async (req, res) => {
    res.json(await Pokemon.find());
});

// Update Pokemon
router.patch('/:id', async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    if (!name) return res.sendStatus(422);

    const pokemon = await Pokemon.findOneAndUpdate({ _id: id }, { name });

    if (!pokemon) return res.sendStatus(404);

    res.sendStatus(204);
});

// Delete Pokemon
// Update Pokemon
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    await Pokemon.deleteOne({ _id: id });

    res.sendStatus(204);
});

export default router;