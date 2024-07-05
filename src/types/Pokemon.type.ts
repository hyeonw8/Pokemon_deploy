export type Pokemon = {
  id: number;
  name: string;
  korean_name: string;
  height: number;
  weight: number;
  sprites: { front_default: string; back_default: string; };
  types: { type: { name: string; korean_name: string } }[];
  abilities: { ability: { name: string; korean_name: string }; is_hidden: boolean; }[];
  moves: { move: { name: string; korean_name: string } }[];
  species: { name: string; korean_flavor_text: string;}
}

export type Colors = Record<string, string>;