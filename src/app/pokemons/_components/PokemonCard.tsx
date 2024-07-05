'use client';

import React from 'react';
import Link from 'next/link';
// import Image from 'next/image';

import type { Pokemon } from '@/types/Pokemon.type';


interface PokemonCardProps {
  pokemon: Pokemon;
  // onClick: () => void;
}

const PokemonCard = ({ pokemon }: PokemonCardProps) => {
  return (
    <Link
      href={`/pokemons/${pokemon.id}`}
      className="flex flex-col p-4 rounded-xl border-white hover:border-black border-4 border-dashed text-center font-DungGeunMo font-bold cursor-pointer"
    >
      <img
        src={pokemon.sprites.front_default}
        alt={`${pokemon.korean_name} 이미지`}
        width={200}
        height={200}
      />
      <p>{pokemon.korean_name}</p>
      <p>도감번호 : {pokemon.id}</p>
    </Link>
  );
};

export default PokemonCard;
