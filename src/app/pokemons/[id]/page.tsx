import React from "react";
import PokemonDetail from "@/app/pokemons/_components/PokemonDetail";
import axios, { AxiosError } from "axios";
import { Metadata } from "next";

import type { Pokemon } from "@/types/Pokemon.type";

interface DetailProps {
  params: {
    id: string;
  };
}

const API_URL = process.env.NEXT_PUBLIC_URL;
const fetchPokemonData = async (id: string): Promise<Pokemon> => {
  
  try {
    const response = await axios(`${API_URL}/api/pokemons/${id}`);
    // console.log('디테일 데이터',response.data);
    if (response.status !== 200) {
      throw new Error("Network response was not ok");
    }
    const data = await response.data;
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // 오류를 다시 던져서 상위 컴포넌트에서 처리하게 함
  }
};

export const generateMetadata = async ({
  params,
}: DetailProps): Promise<Metadata> => {
  const { id } = params;

  const pokemon = await fetchPokemonData(id);

  return {
    title: `No.${pokemon.id.toString().padStart(4, "0")}_ ${pokemon.korean_name} 페이지 🌟`,
    description: `${pokemon.korean_name}의 타입과 능력, 기술을 알아보자-!`,
  };
};

const Detail = async ({ params }: DetailProps) => {
  const { id } = params;
  const pokemon = await fetchPokemonData(id);

  return (
    <div>
      <PokemonDetail pokemon={pokemon} />
    </div>
  );
};

export default Detail;
