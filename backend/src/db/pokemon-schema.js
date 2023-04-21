import mongoose from "mongoose";

const Schema = mongoose.Schema;

const pokemonSchema = new Schema({
    species: Number,
    originalName: String,
    name: { type: String, required: true },
    image: String
});

const Pokemon = mongoose.model('Pokemon', pokemonSchema);

export { Pokemon }