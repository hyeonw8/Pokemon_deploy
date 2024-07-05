import { NextResponse } from "next/server";
import axios from "axios";

type Moves = {
  move: {
    name: string;
    url: string;
  };
  version_group_details: {
    level_learned_at: number;
    move_learn_method: {
      name: string;
      url: string;
    };
    version_group: {
      name: string;
      url: string;
    };
  }[];
}

type Text = {
  flavor_text: string;
  language: {
    name: string;
    url: string;
  };
  verstion: {
    name: string;
    url: string;
  }[];
}

export const GET = async (
  request: Request,
  { params }: { params: { id: string } },
) => {
  const { id } = params;

  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const speciesResponse = await axios.get(
      `https://pokeapi.co/api/v2/pokemon-species/${id}`,
    );

    const koreanName = speciesResponse.data.names?.find(
      (name: {language: {name: string}; name: string;}) => name.language.name === "ko",
    );

    const typesWithKoreanNames = await Promise.all(
      response.data.types.map(async (type: {slot: string; type: {name: string; url: string;}}) => {
        const typeResponse = await axios.get(type.type.url);
        const koreanTypeName =
          typeResponse.data.names?.find(
            (name: {language: {name: string}; name: string;}) => name.language.name === "ko",
          )?.name || type.type.name;
        return { ...type, type: { ...type.type, korean_name: koreanTypeName } };
      }),
    );

    const abilitiesWithKoreanNames = await Promise.all(
      response.data.abilities.map(async (ability: {ability: {name: string; url: string;}; is_hidden: string; slot: number;}) => {
        const abilityResponse = await axios.get(ability.ability.url);
        const koreanAbilityName =
          abilityResponse.data.names?.find(
            (name: {language: {name: string}; name: string;}) => name.language.name === "ko",
          )?.name || ability.ability.name;
        return {
          ...ability,
          ability: { ...ability.ability, korean_name: koreanAbilityName },
        };
      }),
    );

    const movesWithKoreanNames = await Promise.all(
      response.data.moves.map(async (move: Moves) => {
        const moveResponse = await axios.get(move.move.url);
        const koreanMoveName =
          moveResponse.data.names?.find(
            (name: {language: { name: string; url: string;}; name: string;}) => name.language.name === "ko",
          )?.name || move.move.name;
        return { ...move, move: { ...move.move, korean_name: koreanMoveName } };
      }),
    );

    
    const species = response.data.species;
    const koreanFlavorTextName = 
      speciesResponse.data.flavor_text_entries.find(
        (text: Text) => text.language.name === "ko"
    );
    const koreanFlavorText = koreanFlavorTextName ? koreanFlavorTextName.flavor_text : "...?";
    const speciesKoreanNames = {
      ...species,
      korean_flavor_text: koreanFlavorText,
    };

    const pokemonData = {
      ...response.data,
      korean_name: koreanName?.name || response.data.name,
      types: typesWithKoreanNames,
      abilities: abilitiesWithKoreanNames,
      moves: movesWithKoreanNames,
      species: speciesKoreanNames,
    };

    return NextResponse.json(pokemonData);
  } catch (error) {
    console.error("Error fetching Pokemon data:", error);
    return NextResponse.json({ error: "Failed to fetch data" });
  }
};

