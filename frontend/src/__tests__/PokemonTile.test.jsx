import '@testing-library/jest-dom';
import { expect, test, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import PokemonTile from '../PokemonTile';
import { AppContext } from '../AppContextProvider';

beforeAll(() => {
    vi.useFakeTimers();
})

afterAll(() => {
    vi.useRealTimers();
})

beforeEach(() => {
    vi.resetAllMocks();
})

test('Renders img src and name correctly', () => {
    const pokemon = {
        name: 'Prince Zuko',
        originalName: 'Charmander',
        image: 'http://example.com/charmander'
    }

    const { getByDisplayValue } = render(
        <AppContext.Provider value={{ renamePokemon: vi.fn(), releasePokemon: vi.fn() }}>
            <PokemonTile pokemon={pokemon} />
        </AppContext.Provider>
    );

    const input = getByDisplayValue('Prince Zuko');
    expect(input).toBeInTheDocument();
})

test('Calls renamePokemon correctly', async () => {
    const pokemon = {
        _id: 'myId',
        name: 'Charmander',
        originalName: 'Charmander',
        image: 'http://example.com/charmander'
    }

    const renamePokemon = vi.fn();

    const { getByDisplayValue } = render(
        <AppContext.Provider value={{ renamePokemon, releasePokemon: vi.fn() }}>
            <PokemonTile pokemon={pokemon} />
        </AppContext.Provider>
    );

    const input = getByDisplayValue('Charmander');
    fireEvent.change(input, { target: { value: 'Prince Zuko' } });

    vi.runOnlyPendingTimers();

    expect(renamePokemon).toHaveBeenCalledTimes(1);
    expect(renamePokemon).toHaveBeenLastCalledWith('myId', 'Prince Zuko');
})