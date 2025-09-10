import { ButtonDeleteVille } from "./../button/buttonDeleatVille"
import { ButtonChangeToWeek } from "./../button/buttonChangeToWeek"
import { ButtonChangeToDetailDay } from "./../button/buttonChangeToDetailDay"
import OSMMap from "./../cartVille"
import { parseData } from "./../../parseData"


export function VilleCurrentData({ ville, onRemoveVille, meteoData, loading }) {

    const styleDetailData = ""

/* 
        if (loading || !meteoData[ville]) {
            return <div key={ville} className="flex gap-2">
                <p>Chargement de la ville...</p>
                <span className="loading loading-ring loading-xl"></span>
            </div>
        }

 */


    const villeData = parseData(meteoData[ville]);
    //On attends d'avoir la data avant d'afficher
    if (!villeData) {
        return <p key={e} className="flex">
            Chargement météo pour {e} ...
            <span className="loading loading-ring loading-xl"></span>
        </p>
    }


    return <div key={villeData.nameVille}
        className="flex flex-col py-10 px-10 gap-7 border w-full items-center rounded-xl relative bg-white">

        <ButtonDeleteVille onClick={() => onRemoveVille(ville)} />

        <p className="">{villeData.nameVille}</p>



        <div className="flex gap-5 justify-center w-full">
            <div className="border bg-green-50">
                <OSMMap lat={villeData.coord[0]} lng={villeData.coord[1]} />
            </div>

            <div className="flex-col flex gap-3">
                <p className="flex items-center">Ciel :<img className="w-20 h-15" src={villeData.current.currentWeather} /></p>
                <p className={styleDetailData}>temperature : {villeData.current.currentTemperature}°C</p>
                <p className={styleDetailData}>Humidité : {villeData.current.currentHumidity}%</p>
                <p className={styleDetailData}>Précipitation : {villeData.current.currentPrecipitation}mm</p>
                <p className={styleDetailData}>Levé soleil : {villeData.daily.sunrise}</p>
                <p className={styleDetailData}>Couché du soleil : {villeData.daily.sunset}</p>

                <ButtonChangeToDetailDay ville={ville} />
                <ButtonChangeToWeek ville={ville} />

            </div>

        </div>
    </div>


}