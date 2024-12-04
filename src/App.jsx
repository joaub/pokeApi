
import {useEffect, useState} from 'react';
import "../src/index.css"

function App() {

  const [pokemon, setPokemon] = useState(null);
  const [pokemonId, setPokemonId] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [bgColor, setBgColor] = useState("#FFFFFF"); 

  const typeColors = {
    normal: "#A8A77A",
    fire: "#EE8130",
    water: "#6390F0",
    electric: "#F7D02C",
    grass: "#7AC74C",
    ice: "#96D9D6",
    fighting: "#C22E28",
    poison: "#A33EA1",
    ground: "#E2BF65",
    flying: "#A98FF3",
    psychic: "#F95587",
    bug: "#A6B91A",
    rock: "#B6A136",
    ghost: "#735797",
    dragon: "#6F35FC",
    dark: "#705746",
    steel: "#B7B7CE",
    fairy: "#D685AD",
  };
  

  const getPokemon = async (idOrName) => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${idOrName}`);
      if (!response.ok) {
        throw new Error("Pokémon no encontrado");
      }
      const poke = await response.json();
      const types= poke.types.map(type => type.type.name)
      setPokemon({
        id: poke.id,
        name: poke.name,
        img: poke.sprites.other.dream_world.front_default,
        types,
      });
      setPokemonId(poke.id); // Actualizar el estado del ID al ID del Pokémon buscado
      setBgColor(typeColors[types[0]] || "#FFFFFF"); //Color basado en el primer tipo
    } catch (error) {
      alert(error.message);
    }
  };

  
  useEffect(() => {
    getPokemon(pokemonId);
  }, [pokemonId]); 

  // Función para cambiar al siguiente Pokémon
  const nextPokemon = () => {
    setPokemonId((prevId) => prevId + 1); 
  };
  const prevPokemon = () => {
    setPokemonId((prevId) => (prevId > 1 ? prevId - 1 : 1));
  };
  const searchPokemon = () => {
    if (searchValue.trim() !== "") {
      getPokemon(searchValue.toLowerCase());
    }
  };


  return (
    <>
      <div className='body' style={{ backgroundColor: bgColor }}>
        <h1 className='titulo'>Pokedex</h1>
        <div>
          <input
            type="text"
            placeholder="Nombre o ID del Pokémon"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="input"
          />
          <button onClick={searchPokemon} className="btn search">
            Buscar Pokémon
          </button>
        </div>
        {pokemon ? (
          <div>
            <img className='img' src={pokemon.img} alt={pokemon.name} />
            <p className='id'>{pokemon.id}</p>
            <div className='name'>{pokemon.name}</div> 
            <p className='id'>{pokemon.types.join(", ")}</p> 
            <button onClick={prevPokemon} className='btn slide_left'>anterior Pokémon</button>
            <button onClick={nextPokemon} className='btn slide_left'>Siguiente Pokémon</button>
          </div>
        ) : (
          <p>Cargando Pokémon...</p>
        )}
      </div>
    </>
  );

}

export default App