import SearchVille from './components/SearchVille.jsx'
import MainFrameVille from './components/MainFrameVille.jsx'
import useLocalStorage from './customHook/localStorage.jsx';
import Geoloc from "./components/Geoloc.jsx"
import logBanner from "./logBanner.js"


function App() {

  logBanner()
  const [listVille, setListVille] = useLocalStorage("ville", ["toulouse"]);

  const addVille = (newVille) => setListVille(prev => [newVille, ...prev]);

  const deleteVille = (villeDeleted) => {
    setListVille(prev => prev.filter(v => v !== villeDeleted));
    localStorage.removeItem(`Data-${villeDeleted}`)
  }



  return <div className='border flex flex-col items-center p-3 w-max gap-9 bg-stone-200 '>

    < Geoloc onAddVille={addVille} />

    <SearchVille onAddVille={addVille} />
    <MainFrameVille villes={listVille} onRemoveVille={deleteVille} />
  </div>

}



export default App
