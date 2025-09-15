import { descriptionMeteo } from "../../function"
import { switchCaroussel } from "../../animate"
import { ButtonChangeToCurrentDay } from "./../button/buttonChangeToCurrentDay"
import { ButtonChangeToDetailDay } from "./../button/buttonChangeToDetailDay"
import { ButtonDeleteVille } from "./../button/buttonDeleatVille"
import { useState } from "react"







export function VilleDetailWeek({ ville, onRemoveVille, meteoData, loading }) {

    const data = meteoData.week
    const [index, setIndex] = useState(0)

    if (loading) return <div className="flex gap-2">
        <p>Chargement...</p>
        <span className="loading loading-ring loading-xl"></span>
    </div>




    // Fonctions nav caroussel
    const prev = () => {
        const element = document.getElementById(`caroussel-day-${ville}`);
        index === 0 ? null : switchCaroussel(element, setIndex, -1)
    }

    const next = () => {
        const element = document.getElementById(`caroussel-day-${ville}`);
        index === data.length - 1? null : switchCaroussel(element, setIndex, 1)
    }

    const styleFrame = "border flex flex-col items-center bg-sky-200 rounded-2xl py-2 hover:scale-105"



    const currentDay = data[index]

    return <div id={`weekly-${ville}`} className="flex flex-col py-6 gap-7 border rounded-xl w-full items-center relative bg-white">
        <p>{meteoData.nameVille}</p>

        <div id={`caroussel-day-${ville}`} className="items-center flex flex-col gap-4 px-4">
            <h2>{currentDay.day.currentDay}</h2>
            <div className="flex flex-col">
                <div className="flex gap-4">
                    <p className="border px-2 rounded-xl bg-sky-200">
                       Levé du soleil : {currentDay.day.sunrise[index]}</p>

                    <p className="border px-2 rounded-xl bg-sky-200">
                       Couché du soleil : {currentDay.day.sunset[index]}</p>
                </div>
            </div>

            <div className="flex gap-4 py-2 items-center">

                <button className="btn btn-circle" onClick={prev}>❮</button>

                <div className={styleFrame}>
                    <p>Matin</p>
                    <div className="px-5 py-2 ">
                        <img className="w-20 h-15" src={`./../public/${descriptionMeteo(currentDay.matin.weatherM)}`} alt="icone de la meteo " />

                        <p className="flex"><img width="24" height="24" src="https://img.icons8.com/ultraviolet/24/temperature.png" alt="temperature" />
                            : {currentDay.matin.tempM}°C</p>

                        <p className="flex"><img width="24" height="24" src="https://img.icons8.com/color/24/blur.png" alt="blur" />
                            : {currentDay.matin.humidityM.toFixed(1)}%</p>

                        <p className="flex"><img width="24" height="24" src="https://img.icons8.com/ultraviolet/40/hygrometer.png" alt="hygrometer" />
                            : {currentDay.matin.precipitationM}mm</p>

                        <p className="flex"><img width="24" height="24" src="https://img.icons8.com/color/24/wind.png" alt="wind" />
                            : {currentDay.matin.windM.toFixed(1)}km/h</p>
                    </div>
                </div>

                <div className={styleFrame}>
                    <p>Soir</p>

                    <div className="px-5 py-2">
                        <img className="w-20 h-15" src={`./../public/${descriptionMeteo(currentDay.soir.weatherS)}`} alt="icone de la meteo " />
                        <p className="flex"><img width="24" height="24" src="https://img.icons8.com/ultraviolet/24/temperature.png" alt="temperature" />
                            : {currentDay.soir.tempS}°C</p>

                        <p className="flex"><img width="24" height="24" src="https://img.icons8.com/color/24/blur.png" alt="blur" />
                            : {currentDay.soir.humidityS.toFixed(1)}%</p>

                        <p className="flex"><img width="24" height="24" src="https://img.icons8.com/ultraviolet/40/hygrometer.png" alt="hygrometer" />
                            : {currentDay.soir.precipitationS}mm</p>

                        <p className="flex"><img width="24" height="24" src="https://img.icons8.com/color/24/wind.png" alt="wind" />
                            : {currentDay.soir.windS.toFixed(1)}km/h</p>
                    </div>
                </div>
                <button className="btn btn-circle" onClick={next}>❯</button>
            </div>
        </div>

        <div className="flex gap-4">
            < ButtonChangeToCurrentDay ville={ville} />
            < ButtonChangeToDetailDay ville={ville} />
            < ButtonDeleteVille onClick={() => onRemoveVille(ville)} ville={ville} />
        </div>

    </div>
}