import PokemonBox from "./PokemonBox"
import { useContext } from "react";
import { AppContext } from "./AppContextProvider";

function App() {

  const { catchRandomPokemon } = useContext(AppContext);

  return (
    <>
      <h1>My Pokemon</h1>

      <button onClick={catchRandomPokemon}>Add random Pokemon</button>

      <PokemonBox />
    </>
  )
}

export default App
