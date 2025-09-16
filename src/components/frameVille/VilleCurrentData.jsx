import { ButtonDeleteVille } from "./../button/buttonDeleatVille"
import { ButtonChangeToWeek } from "./../button/buttonChangeToWeek"
import { ButtonChangeToDetailDay } from "./../button/buttonChangeToDetailDay"
import OSMMap from "./../cartVille"
import { parseData } from "./../../parseData"


export function VilleCurrentData({ ville, onRemoveVille, meteoData }) {

    const styleDetailData = "flex h-full"
    const styleSun = "border rounded-xl px-4 bg-sky-200 text-center shadow-xl block"
    const villeData = parseData(meteoData);

    //On attends d'avoir la data avant d'afficher
    if (!villeData) {
        return <p key={e} className="flex">
            Chargement météo pour {e} ...
            <span className="loading loading-ring loading-xl"></span>
        </p>
    }


    return <div key={villeData.nameVille}
        className="flex flex-col py-10 px-4 gap-7 border w-full items-center rounded-xl bg-white">


        <h2 className="">{villeData.nameVille}</h2>
        <div className="flex gap-4 justify-center items-center">
            <p className={styleSun}>Levé soleil <br/> {villeData.daily.sunrise}</p>
            <p className={styleSun}>Couché du soleil <br/> {villeData.daily.sunset}</p>
            <p className={styleSun}>Indice UV <br/> {villeData.daily.uv[0]}</p>
        </div>


        <div className="flex flex-col gap-5 justify-center">

            <div className="border rounded-xl bg-sky-200 p-2 animate-fade-in">

                <h2>Actuellement à {villeData.nameVille.split(",")[0]}</h2>

                <div className="flex flex-wrap gap-2 justify-between items-center">
                    <p className={styleDetailData+ "animate-fade-in" } style={{ animationDelay: `${0 * 100 + 400}ms` }}><img className="w-20 h-16" src={villeData.current.currentWeather} /></p>

                    <p className={styleDetailData+ "animate-fade-in" } style={{ animationDelay: `${1 * 100 + 400}ms` }}><img width="40" src="https://img.icons8.com/ultraviolet/24/temperature.png" alt="temperature" />
                        : {villeData.current.currentTemperature}°C</p>

                    <p className={styleDetailData+ "animate-fade-in" } style={{ animationDelay: `${2 * 100 + 400}ms` }}><img width="40" src="https://img.icons8.com/color/24/blur.png" alt="blur" />
                        : {villeData.current.currentHumidity}%</p>

                    <p className={styleDetailData+ "animate-fade-in" } style={{ animationDelay: `${3 * 100 + 400}ms` }}> <img width="40" height="40" src="https://img.icons8.com/color/24/wind.png" alt="wind" />
                        : {villeData.current.currentWind}Km/h</p>

                    <p className={styleDetailData+ "animate-fade-in" } style={{ animationDelay: `${4 * 100 + 400}ms` }}><img width="40" src="https://img.icons8.com/ultraviolet/40/hygrometer.png" alt="hygrometer" />
                        : {villeData.current.currentPrecipitation}mm</p>
                </div>

            </div>



            <div className="border bg-green-50 rounded-xl overflow-hidden w-full max-w-md mx-auto">
                <OSMMap lat={villeData.coord[0]} lng={villeData.coord[1]} />
            </div>
        </div>

        <div className="flex flex gap-2 relative">
            <ButtonChangeToDetailDay ville={ville} />
            <ButtonChangeToWeek ville={ville} />
            <ButtonDeleteVille onClick={() => onRemoveVille(ville)} />
        </div>

    </div>


}