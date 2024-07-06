import Link from "next/link";
import { typeColors } from "./PokemonMoveColor";

import type { Colors, Pokemon } from "@/types/Pokemon.type";

interface PokemonDetailProps {
  pokemon: Pokemon;
}

const PokemonDetail = ({ pokemon }: PokemonDetailProps) => {
  const formatHeightAndWeight = (data: number) => {
    const stringData = data.toString();

    if (stringData.length === 1) {
      return `0.${stringData}`;
    }
    if (stringData.length !== 1) {
      return `${stringData.slice(0, -1)}.${stringData.slice(-1)}`;
    }
  };

  return (
    <div className="p-5 flex justify-center">
      <div className="flex justify-center mr-24">
        <Link href="/">
          <img
            src="/pixel-speech-bubble.png"
            alt="뒤로가기 이미지"
            className="w-[90px] mr-5"
          />
        </Link>
        <div className="w-[700px] flex flex-col justify-center items-center font-DungGeunMo text-black rounded-xl bg-gray-50 leading-8 text-center">
          <div className="text-center w-full bg-purple-300 p-3 rounded-xl ">
            <p className="text-2xl font-medium">{pokemon.korean_name}</p>
            <p className="text-xl">
              {`No.${pokemon.id.toString().padStart(4, "0")}`}
            </p>
          </div>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} width={150} height={150} />
          <p className="text-lg ">이름 : {pokemon.korean_name}</p>
          <div className="flex flex-row gap-3 mb-1 text-lg">
            <p>키 : {formatHeightAndWeight(pokemon.height)} m</p>
            <p>무게 : {formatHeightAndWeight(pokemon.weight)} kg</p>
          </div>
          <div className="flex flex-row gap-x-5">
            <div className="flex flex-row items-center mb-2">
              <span>타입 :</span>
              {pokemon.types.map((type, index) => (
                <span
                  key={index}
                  className={`${
                    typeColors[type.type.korean_name as keyof Colors] ||
                    "bg-gray-500"
                  } ml-2 px-2 rounded text-white`}
                >
                  {type.type.korean_name}
                </span>
              ))}
            </div>
            <div className="flex flex-row items-center mb-2">
              <span>능력 :</span>
              {pokemon.abilities.map((type, index) => (
                <span
                  key={index}
                  className={`${type.is_hidden ? "bg-green-500" : "bg-blue-500"} ml-2 px-2 rounded text-white`}
                >
                  {type.ability.korean_name}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-3 text-blue-700 px-10">
            {pokemon.species.korean_flavor_text}
          </div>
          <div className="px-10 py-5">
            <p>기술 : </p>
            <span>
              {pokemon.moves.map((move) => move.move.korean_name).join(" • ")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;
