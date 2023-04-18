import React from 'react';
import useGet from './hooks/useGet';
import axios from 'axios';
export const AppContext = React.createContext();

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function AppContextProvider({ children }) {

    const { data: allPokemon, refresh } = useGet(`${API_BASE_URL}/api/pokemon`, []);

    async function catchRandomPokemon() {
        try {
            const response = await axios.post(`${API_BASE_URL}/api/pokemon/random`);
            refresh();
        }
        catch (err) {
            // TODO display some kind of useful error message here.
        }
    }

    async function renamePokemon(id, nickname) {
        try {
            const response = await axios.patch(`${API_BASE_URL}/api/pokemon/${id}`, { name: nickname });
            refresh();
        }
        catch (err) {
            // TODO display some kind of useful error message here.
        }
    }

    async function releasePokemon(id) {
        try {
            const response = await axios.delete(`${API_BASE_URL}/api/pokemon/${id}`);
            refresh();
        }
        catch (err) {
            // TODO display some kind of useful error message here.
        }
    }

    // Needs: 1) list of all pokemon, 2) function to add a random pokemon, 3) function to handle nickname change, 4) function to delete a pokemon
    const context = {
        allPokemon,
        catchRandomPokemon,
        renamePokemon,
        releasePokemon
    }

    return (
        <AppContext.Provider value={context}>
            {children}
        </AppContext.Provider>
    )

}