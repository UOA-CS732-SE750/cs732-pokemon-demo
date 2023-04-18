import mongoose from "mongoose";

const Schema = mongoose.Schema;

const pokemonSchema = new Schema({
    species: Number,
    originalName: String,
    name: String,
    image: String
});

const Pokemon = mongoose.model('Pokemon', pokemonSchema);

export { Pokemon }