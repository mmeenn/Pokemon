import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import ReactLoading from "react-loading";
import { MdOutlineCatchingPokemon } from "react-icons/md";

//dialog
import { Fragment, useRef} from 'react'
import { Dialog, Transition } from '@headlessui/react'

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

  //dialog
  const [open, setOpen] = useState(false)

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
      setOpen(!open);
      // alert(`You already have ${newFavPoke.name} in your list.`);
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
      <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-200 sm:mx-0 sm:h-10 sm:w-10">
                    <MdOutlineCatchingPokemon className="w-[30px] h-[30px]" />
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                      Repeated list
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                        {`You already have ${poke.name} in your favorite list.`}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-blue-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-800 sm:ml-3 sm:w-auto focus:outline-none"
                    onClick={() => setOpen(false)}
                  >
                    Ok, I've got it.
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
    </div>
  );
}

export default App;