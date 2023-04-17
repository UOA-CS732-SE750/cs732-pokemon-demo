import PokemonBox from "./PokemonBox"
import { useState } from "react";
import { v4 as uuid } from "uuid";

function App() {

  const [pokemonArray, setPokemonArray] = useState([]);

  async function addRandomPokemon() {
    const rnd = Math.floor(Math.random() * 1008) + 1;
    const url = `https://pokeapi.co/api/v2/pokemon/${rnd}`;
    const response = await fetch(url);
    const data = await response.json();

    const newPokemon = {
      id: uuid(),
      originalName: data.name,
      name: data.name,
      image: data.sprites.front_default
    }

    setPokemonArray([...pokemonArray, newPokemon]);
  }

  function handleRemovePokemon(pokemon) {

    if (pokemon.originalName !== pokemon.name) return;

    const newArray = pokemonArray.filter((item) => item.id !== pokemon.id);
    setPokemonArray(newArray);
  }

  function handleChangeNickname(pokemon, nickname) {
    const index = pokemonArray.indexOf(pokemon);
    const newArray = [...pokemonArray];
    newArray[index] = {
      ...pokemon,
      name: nickname
    }
    setPokemonArray(newArray);
  }

  return (
    <>
      <h1>My Pokemon</h1>

      <button onClick={addRandomPokemon}>Add random Pokemon</button>

      <PokemonBox onChangeNickname={handleChangeNickname}
        onRemovePokemon={handleRemovePokemon}
        pokemonArray={pokemonArray} />
    </>
  )
}

export default App
