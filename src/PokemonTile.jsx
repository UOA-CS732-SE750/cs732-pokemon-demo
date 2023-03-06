import styles from './PokemonTile.module.css'

export default function PokemonTile({ pokemon, onRemovePokemon, onChangeNickname }) {

    const hasNickname = (pokemon.originalName !== pokemon.name);

    return (
        <div className={hasNickname ? `${styles.container} ${styles.nicknamed}` : styles.container}>
            <img onDoubleClick={() => onRemovePokemon(pokemon)} src={pokemon.image} />

            {/* <p>{pokemon.name}</p> */}
            <input type="text" value={pokemon.name}
                onChange={(e) => onChangeNickname(pokemon, e.target.value)} />
        </div>
    )
}