import { useState } from "react";
import PokemonTile from "./PokemonTile";
import styles from './PokemonBox.module.css';

function PokemonBox({ pokemonArray, onRemovePokemon, onChangeNickname }) {

    return (
        <div className={styles.container}>

            {pokemonArray.map((pokemon) => (
                <PokemonTile onChangeNickname={onChangeNickname} onRemovePokemon={onRemovePokemon} key={pokemon.id} pokemon={pokemon} />
            ))}

        </div>
    )
}

export default PokemonBox;