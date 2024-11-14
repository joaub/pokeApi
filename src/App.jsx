
import {useEffect, useState} from 'react';


function App() {

  let [pokemon, setPokemon] = useState(null);
  const [pokemonId, setPokemonId] = useState(1);
  

  const getPokemon = async (id) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const poke = await response.json();
    setPokemon({
      id: poke.id,
      name: poke.name,
      img: poke.sprites.other.dream_world.front_default,
    });
  };

  
  useEffect(() => {
    getPokemon(pokemonId);
  }, [pokemonId]); 

  // Función para cambiar al siguiente Pokémon
  const nextPokemon = () => {
    setPokemonId((prevId) => prevId + 1); 
  };


  return (
    <>
      <div>
        <h1>Pokedex</h1>
        {pokemon ? (
          <div>
            <img src={pokemon.img} alt={pokemon.name} />
            <p>{pokemon.id}</p>
            <div>{pokemon.name}</div>
            <button onClick={nextPokemon}>Siguiente Pokémon</button>
          </div>
        ) : (
          <p>Cargando Pokémon...</p>
        )}
      </div>
    </>
  );

}

export default App
