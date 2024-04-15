import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import ReactLoading from "react-loading";
import { MdOutlineCatchingPokemon } from "react-icons/md";

//components
import FavPoke from "./components/FavPoke";

function App() {
  const [poke, setPoke] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [pokeId, setPokeId] = useState(1);
  const [searchNum, setSearchNum] = useState("");
  const [fav, setFav] = useState([]);

  //Function
  const nextPoke = () => {
    setPokeId((pokeId) => ++pokeId);
  };

  const prevPoke = () => {
    setPokeId((pokeId) => --pokeId);
  };

  const searchHandler = (event) => {
    event.preventDefault();
    setPokeId(searchNum);
    setSearchNum("");
  };

  const addFav = () => {
    setFav((prevState) => [...prevState, poke]);
  };

  useEffect(() => {
    let abortController = new AbortController();

    const loadPoke = async () => {
      try {
        setLoading(true);
        let response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${pokeId}`,
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
    console.log(poke);
    console.log("Poke Id: ", pokeId);

    return () => abortController.abort();
  }, [pokeId]);

  return (
    <div className="max-w-5xl p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
        <div>
          {loading ? (
            <div className="flex h-full justify-center items-center">
            <ReactLoading
              type="spokes"
              color="black"
              height={"15%"}
              width={"15%"}
            />
            </div>
          ) : (
            <>
              <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                {poke?.name}
              </h1>
              <button
                className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                onClick={addFav}
              >
                Add to Favourite
              </button>
              <br />
              <img
                src={poke?.sprites?.other?.home?.front_default}
                alt={poke?.name}
              />
              <ul>
                <h3 className="text-xl font-bold dark:text-white">Ability</h3>
                {poke?.abilities?.map((abil, idx) => (
                  <li key={idx}>{abil.ability.name}</li>
                ))}
              </ul>
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
                <form onSubmit={searchHandler} class="flex items-center max-w-sm mx-auto">
                  <label for="simple-search" class="sr-only">
                    Search
                  </label>
                  <div class="relative w-full">
                    <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <MdOutlineCatchingPokemon className="w-30% h-30%" />
                    </div>
                    <input
                      type="number"
                      id="simple-search"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Search from Pokemon ID"
                      value={searchNum}
                      onChange={(e)=>setSearchNum(e.target.value)}
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    class="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    <svg
                      class="w-4 h-4"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                      />
                    </svg>
                    <span class="sr-only">Search</span>
                  </button>
                </form>
              </div>
            </>
          )}
        </div>
        <div>
          <h3 className="text-3xl font-bold dark:text-white">
            Your favourite Pokemon
          </h3>
          {fav.length > 0 ? (
            <FavPoke fav={fav} />
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
