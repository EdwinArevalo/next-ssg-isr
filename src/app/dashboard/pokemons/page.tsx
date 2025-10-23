import { PokemonGrid, PokemonsReponse, SimplePokemon } from "@/pokemons";
import { notFound } from "next/navigation";


export const metadata = {
 title: '100 Pokémons',
 description: 'Ad minim sit cupidatat culpa consectetur.',
};


const getPokemons = async( limit = 20, offset= 0 ):Promise<SimplePokemon[]> => {
  const data:PokemonsReponse = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${ offset }`, 
    {
      // cache: 'force-cache',
      // cache: 'no-cache',
      // cache: 'no-store',
      // next: { revalidate: 3600 } // 1 hora
    }
  )
    .then( res => res.json() );

    const pokemons = data.results.map( pokemon => ({
      id: pokemon.url.split('/').at(-2)!,
      name: pokemon.name,
    }));

    // throw new Error('Esto es un error que no debería de suceder');
    // notFound();

    return pokemons;
}




export default async function PokemonsPage() {

  const pokemons = await getPokemons(100);
  
  return (
    <div className="flex flex-col">

      <span className="text-5xl my-2">Listado de Pokémons <small>estático</small></span>
      
      <PokemonGrid pokemons={ pokemons } />

    </div>
  );
}