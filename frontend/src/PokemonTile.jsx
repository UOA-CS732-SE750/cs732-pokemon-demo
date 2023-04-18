import { useContext, useEffect, useState } from 'react';
import { AppContext } from './AppContextProvider';
import styles from './PokemonTile.module.css'

export default function PokemonTile({ pokemon }) {

    const { renamePokemon, releasePokemon } = useContext(AppContext);

    const hasNickname = (pokemon.originalName !== pokemon.name);

    const [newNickname, setNewNickname] = useState(pokemon.name);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (pokemon.name === newNickname) return;
            renamePokemon(pokemon._id, newNickname);
        }, 200);

        return () => clearTimeout(timer);
    });

    function handleReleasePokemon() {
        if (hasNickname) return;
        releasePokemon(pokemon._id);
    }

    return (
        <div className={hasNickname ? `${styles.container} ${styles.nicknamed}` : styles.container}>
            <img onDoubleClick={handleReleasePokemon} src={pokemon.image} />

            <input type="text" value={newNickname}
                onChange={(e) => setNewNickname(e.target.value)} />
        </div>
    )
}