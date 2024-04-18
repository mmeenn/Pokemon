import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import ReactLoading from "react-loading";

//components
import FavPoke from "./components/FavPoke";
import SearchPoke from "./components/SearchPoke";

function App() {
  const [poke, setPoke] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPoke, setShowPoke] = useState();
  const [pokeName, setPokeName] = useState(poke.name);
  const [fav, setFav] = useState([]);

  const nextPoke = () => {
    const pokeId = poke.id+1;
    setShowPoke(pokeId);
  };

  const prevPoke = () => {
    const pokeId = poke.id-1;
    setShowPoke(pokeId);
  };

  const searchHandler = (event) => {
    event.preventDefault();
    setShowPoke(pokeName);
    setPokeName("");
  };

  const addFav = (pokeData) => {
    const newFavPoke = {...pokeData}
    const foundId = fav.find((e)=>e.id===newFavPoke.id)
    if(foundId){
      alert("Have this pokemon");
    } else{
      setFav([...fav, newFavPoke]);
    }
  };

  const unLikePoke = (disLikeId) => {
    const newFavPoke = fav.filter((e)=> e.id !== disLikeId)
    setFav(newFavPoke)
  }

  useEffect(() => {
    setShowPoke("pikachu");
  }, []);

  useEffect(() => {
    let abortController = new AbortController();

    const loadPoke = async () => {
      try {
        setLoading(true);
        let response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${showPoke}`,
          {
            signal: abortController.signal,
          }
        );

        setPoke(response.data);
        setError("");
      } catch (error) {
        setError("Something went wrong", error);
      } finally {
        setLoading(false);
      }
    };

    loadPoke();

    return () => abortController.abort();
  }, [showPoke]);


  return (
    <div className="max-w-5xl p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 min-w-[942px] min-h-[785px]">
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
        <div>
          {loading ? (
            <div className="flex h-full justify-center items-center min-w-[487px] min-h-[788px]">
              <ReactLoading
                type="spokes"
                color="black"
                height={"15%"}
                width={"15%"}
              />
            </div>
          ) : (
            <div className="min-w-[487px] min-h-[788px]">
              <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                {poke?.name}
              </h1>
              <img
                src={poke?.sprites?.other?.home?.front_default}
                alt={poke?.name}
                className="min-w-[487px] min-h-[487px]"
              />
              <ul>
                <h3 className="text-xl font-bold dark:text-white">Ability</h3>
                {poke?.abilities?.map((abil, idx) => (
                  <li key={idx}>{abil.ability.name}</li>
                ))}
              </ul>
              <button
                className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 mt-2"
                onClick={()=>{addFav(poke)}}
              >
                Add to Favourite
              </button>
              <br />
              <button
                className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                onClick={prevPoke}
              >
                previos
              </button>
              <button
                className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                onClick={nextPoke}
              >
                next
              </button>
              <div>
                <SearchPoke
                  searchHandler={searchHandler}
                  pokeName={pokeName}
                  setPokeName={setPokeName}
                />
              </div>
            </div>
          )}
        </div>
        <div>
          <h3 className="text-3xl font-bold dark:text-white">
            Your favourite Pokemon
          </h3>
          {fav.length > 0 ? (
            <FavPoke fav={fav} unLikePoke={unLikePoke} />
          ) : (
            <div className="flex h-full justify-center items-center">
              <p>No favourite Pokemon</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
