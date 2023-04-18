import PokemonTile from "./PokemonTile";
import styles from './PokemonBox.module.css';
import { AppContext } from "./AppContextProvider";
import { useContext } from "react";

function PokemonBox() {

    const { allPokemon } = useContext(AppContext);

    return (
        <div className={styles.container}>

            {allPokemon.map((pokemon) => (
                <PokemonTile key={pokemon._id} pokemon={pokemon} />
            ))}

        </div>
    )
}

export default PokemonBox;