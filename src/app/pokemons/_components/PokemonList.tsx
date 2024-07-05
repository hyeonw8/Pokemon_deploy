import React from 'react';
import PokemonCard from './PokemonCard';

import type { Pokemon } from '@/types/Pokemon.type';

interface PokemonListProps {
  pokemons: Pokemon[];
}

const PokemonList = ({pokemons}: PokemonListProps) => {
  return (
    <>
      <p className='font-dalmoori text-xl text-center mt-5'>앗! 야생의 포켓몬이 나타났다...!</p>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 p-5'>
          {pokemons.map((pokemon, idx) => <PokemonCard key={idx} pokemon={pokemon} />)}
      </div>
    </>
  );
};

export default PokemonList;
