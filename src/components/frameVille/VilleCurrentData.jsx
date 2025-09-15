import { ButtonDeleteVille } from "./../button/buttonDeleatVille"
import { ButtonChangeToWeek } from "./../button/buttonChangeToWeek"
import { ButtonChangeToDetailDay } from "./../button/buttonChangeToDetailDay"
import OSMMap from "./../cartVille"
import { parseData } from "./../../parseData"


export function VilleCurrentData({ ville, onRemoveVille, meteoData, loading }) {

    const styleDetailData = "flex"
    const styleSun = "border rounded-xl px-2 bg-sky-200 "


    const villeData = parseData(meteoData);
    //On attends d'avoir la data avant d'afficher
    if (!villeData) {
        return <p key={e} className="flex">
            Chargement météo pour {e} ...
            <span className="loading loading-ring loading-xl"></span>
        </p>
    }


    return <div key={villeData.nameVille}
        className="flex flex-col py-10 px-10 gap-7 border w-full items-center rounded-xl relative bg-white">


        <p className="">{villeData.nameVille}</p>

        <div className="flex gap-4">
            <p className={styleSun}>Levé soleil : {villeData.daily.sunrise}</p>
            <p className={styleSun}>Couché du soleil : {villeData.daily.sunset}</p>
        </div>


        <div className="flex gap-5 justify-center ">
            <div className="border bg-green-50">
                <OSMMap lat={villeData.coord[0]} lng={villeData.coord[1]} />
            </div>

            <div className="flex-col flex gap-3">
                <p className="flex items-center">Ciel :<img className="w-20 h-15" src={villeData.current.currentWeather} /></p>
                <p className={styleDetailData}><img width="24" height="24" src="https://img.icons8.com/ultraviolet/24/temperature.png" alt="temperature" />
                    : {villeData.current.currentTemperature}°C</p>

                <p className={styleDetailData}><img width="24" height="24" src="https://img.icons8.com/color/24/blur.png" alt="blur" />
                    : {villeData.current.currentHumidity}%</p>

                <p className={styleDetailData}><img width="24" height="24" src="https://img.icons8.com/ultraviolet/40/hygrometer.png" alt="hygrometer" />
                    : {villeData.current.currentPrecipitation}mm</p>
            </div>
        </div>

        <div className="flex flex gap-2 relative">
            <ButtonChangeToDetailDay ville={ville} />
            <ButtonChangeToWeek ville={ville} />
            <ButtonDeleteVille onClick={() => onRemoveVille(ville)} />
        </div>

    </div>


}