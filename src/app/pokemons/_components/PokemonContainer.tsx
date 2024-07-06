"use client";

import React from "react";
import axios, { AxiosError } from "axios";
import PokemonList from "@/app/pokemons/_components/PokemonList";

import type { Pokemon } from "@/types/Pokemon.type";
import { useQuery } from "@tanstack/react-query";

const PokemonContainer = () => {

  const {
    data: pokemons,
    isPending,
    error,
  } = useQuery<Promise<Pokemon[]>, AxiosError, Pokemon[]>({
    queryKey: ["pokemons"],
    queryFn: async () => {
      const response = await axios.get<Pokemon[]>("/api");
      console.log(response.data);
      return response.data;     
    },
  });


  if (isPending) {
    return (
      <div className="h-screen flex flex-col justify-center items-center font-dalmoori">
        <div className="text-xl flex flex-col p-4 justify-center items-center gap-2 rounded-lg w-[400px]">
          <img src="/pokemon_logo.png" alt="포켓몬 로고" />
          <p className="text-lg mt-5">--- 포켓몬 데이터 수집 중 ---</p>
        </div>
      </div>
    );
  }

  if (error) {
    console.error(error);
    console.log(error);
    return <div className="text-xl">에러가 발생했습니다: {error?.message}</div>;
  }

  return (
    <div>
      <PokemonList pokemons={pokemons} />
    </div>
  );
};

export default PokemonContainer;
