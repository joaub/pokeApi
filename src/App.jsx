
import {useEffect, useState} from 'react';


function App() {

  let [pokemones, setPokemones] = useState([]);
  

  useEffect(() => {
    const getPokemones = async() =>{
      const response = await fetch(  "https://pokeapi.co/api/v2/pokemon ")
      const listaPokemones = await response.json()
      const {results} = listaPokemones
      
      const newPokemones = results.map(async (pokemon) =>{
        const response = await fetch(pokemon.url)
        const poke = await response.json()

        return{
          id:poke.id,
          name:poke.name,
          img: poke.sprites.other.dream_world.front_default
        }
      })
      setPokemones(await Promise.all(newPokemones))
    }
    
    getPokemones()
      
  }, [])

  

  return (
    <>
      <div >
        <h1>pokedex</h1>
        <>
        {
            Array.isArray(pokemones) && pokemones.map((pokemon, index) => (
              // eslint-disable-next-line react/jsx-key
              <div >
                <img src={pokemon.img} alt={pokemon.name}/>
                <p key={index}>{pokemon.id}</p>
                <div key={index}>{pokemon.name}</div>
                
                
              </div>
              
            ))
          }
        </>
        
        
        
      </div>
    </>
  )
}

export default App
