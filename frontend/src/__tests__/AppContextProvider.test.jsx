import '@testing-library/jest-dom';
import { expect, test } from 'vitest';
import { render } from '@testing-library/react';
import AppContextProvider, { AppContext } from '../AppContextProvider';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { useContext } from 'react';

let axiosMock;

beforeAll(() => {
    axiosMock = new MockAdapter(axios);
});

afterEach(() => {
    axiosMock.reset();
});

test('AppContextProvider makes GET request to API on render', () => {

    const pokemon = [
        {
            _id: 'myId',
            species: 4,
            name: 'Charmander',
            originalName: 'Charmander',
            image: 'http://example.com/charmander'
        }
    ]

    axiosMock.onGet('/api/pokemon').reply(200, pokemon);

    const { } = render(<AppContextProvider />);

    expect(axiosMock.history.get.length).toBe(1);
    expect(axiosMock.history.get[0].url).toEqual('/api/pokemon');

});

test('AppContextProvider exposes retrieved pokemon data as "allPokemon" context item', async () => {

    const pokemon = [
        {
            _id: 'myId',
            species: 4,
            name: 'Charmander',
            originalName: 'Charmander',
            image: 'http://example.com/charmander'
        }
    ]

    axiosMock.onGet('/api/pokemon').reply(200, pokemon);

    const { findByText } = render(
        <AppContextProvider>
            <DummyConsumer />
        </AppContextProvider>);

    
    const p = await findByText('_id: myId, species: 4, name: Charmander, originalName: Charmander, image: http://example.com/charmander');
    expect(p).toBeInTheDocument();

});

function DummyConsumer() {
    const { allPokemon } = useContext(AppContext);
    return (
        <>
            {allPokemon.map(({_id, species, name, originalName, image}) => (
            <p key={_id}>_id: {_id}, species: {species}, name: {name}, originalName: {originalName}, image: {image}</p>
            ))}
        </>
    );
}