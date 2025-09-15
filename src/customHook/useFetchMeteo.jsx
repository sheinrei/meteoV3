import { useState, useEffect } from "react";
import useLocalStorage from './localStorage.jsx';

export function useMeteo(villes, onVilleInvalide) {
  const [meteoData, setMeteoData] = useState({});
  const [loading, setLoading] = useState(true);
  const [listVille, setListVille] = useLocalStorage("ville", []);

  const deleteVille = (villeDeleted) => {
    setListVille(prev => prev.filter(v => v !== villeDeleted));
    // Appeler le callback pour informer le parent
    if (onVilleInvalide) {
      onVilleInvalide(villeDeleted);
    }
  };



  useEffect(() => {
    if (!villes || villes.length === 0) {
      setMeteoData({});
      setLoading(false);
      return;
    }

    const fetchCoords = async () => {
      try {
        const results = {};

        for (const v of villes) {

          //recherche d'abords si present dans localStorage en cas on skip
          const dataBrut = localStorage.getItem(`Data-${v}`)
          const dataStorage = JSON.parse(dataBrut)

          const date = new Date();
          const currentTime = date.getTime();

          if (dataStorage) {
            const diffMaj = currentTime - dataStorage.lastUpdate;
            const twoHours = 1000 * 60 * 60 * 2;
            if (diffMaj < twoHours) {
              continue
            }
          }


          // fetch des coordonnées
          const res = await fetch(
            `https://nominatim.openstreetmap.org/search?city=${v}&format=json&addressdetails=1&limit=1`
          );

          const dataCoord = await res.json();

          if (dataCoord.length === 0) {
            alert(`Ville inexistante :"${v}" !\n Veuillez ressaisir une ville`);
            deleteVille(v);
            continue;
          }

          const nameVille = dataCoord[0].display_name;
          const lat = dataCoord[0].lat;
          const lon = dataCoord[0].lon;



          
          // fetch de la météo
          console.log("lancement de fetch pour :", v);
          const res2 = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=sunrise,sunset&hourly=temperature_2m,weather_code,relative_humidity_2m,precipitation,rain,wind_speed_10m&current=temperature_2m,relative_humidity_2m,weather_code,precipitation&timezone=Europe%2FBerlin`
          );
          const data = await res2.json();
          results[v] = {
            name: nameVille,
            meteo: data,
            coord: [lat, lon],
            loading: false,
            lastUpdate: currentTime
          };

          window.localStorage.setItem(`Data-${v}`, JSON.stringify(results[v]))
        }


        setMeteoData(results);
      } catch (err) {
        console.error("Erreur :", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCoords();
  }, [villes]);

  return { meteoData, loading };
}