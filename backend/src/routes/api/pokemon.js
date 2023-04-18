import axios from 'axios';
import express from 'express';
import { v4 as uuid } from 'uuid';

const router = express.Router();

const allPokemon = [];

// Create a pokemon with the given species, and sends it back in the given response.
async function createPokemon(species, res) {
    const url = `https://pokeapi.co/api/v2/pokemon/${species}`;
    try {
        const response = await axios.get(url);

        const pokemon = {
            id: uuid(),
            species: parseInt(species),
            originalName: response.data.name,
            name: response.data.name,
            image: response.data.sprites.front_default
        }

        allPokemon.push(pokemon);

        res.status(201).location(`/api/pokemon/${pokemon.id}`).json(pokemon);
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
router.get('/:id', (req, res) => {
    const { id } = req.params;

    const pokemon = allPokemon.find(p => p.id === id);

    if (!pokemon) return res.sendStatus(404);

    res.json(pokemon);
});

// Read list of all Pokemon
router.get('/', (req, res) => {
    res.json(allPokemon);
});

// Update Pokemon
router.patch('/:id', (req, res) => {
    const { id } = req.params;
    const pokemon = allPokemon.find(p => p.id === id);

    if (!pokemon) return res.sendStatus(404);

    const { name } = req.body;
    if (!name) return res.sendStatus(422);

    pokemon.name = name;
    res.sendStatus(204);
});

// Delete Pokemon
// Update Pokemon
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const index = allPokemon.findIndex(p => p.id === id);
    if (index >= 0) {
        allPokemon.splice(index, 1);
    }

    res.sendStatus(204);
});

export default router;