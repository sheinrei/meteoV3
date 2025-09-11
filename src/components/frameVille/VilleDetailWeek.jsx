import { descriptionMeteo } from "../../function"
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

    // Fonctions corrigées pour naviguer entre les jours
    const prev = () => setIndex(index === 0 ? index : index - 1)
        
    const next = () => setIndex(index === data.length - 1 ? index : index + 1)

    // Plus besoin d'arrayTest, on utilise directement data[index]
    const currentDay = data[index]

    return <div className="flex flex-col py-6 gap-5 border rounded-xl w-full items-center relative bg-white">
        <p>{meteoData.nameVille}</p>

        <div className="border items-center flex flex-col ">
            <p>{currentDay.day.currentDay}</p>
            <div className="flex flex-col">
                <div className="flex gap-4">
                    <p className="flex items-center"><img width="30" height="30" src="https://img.icons8.com/color/24/sunrise.png" alt="sunrise" />
                        : {currentDay.day.sunrise[index]}</p>

                    <p className="flex items-center"><img width="30" height="30" src="https://img.icons8.com/color/50/sunset.png" alt="sunset" />
                        : {currentDay.day.sunset[index]}</p>
                </div>
            </div>

            <div className="flex gap-4 py-2 items-center">

                <button className="btn btn-circle" onClick={prev}>❮</button>

                <div className="border flex flex-col items-center">
                    <p>Matin</p>
                    <div className="px-2">
                        <img className="w-28 h-24" src={`./../public/${descriptionMeteo(currentDay.matin.weatherM)}`} alt="icone de la meteo " />

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

                <div className="border flex flex-col items-center">
                    <p>Soir</p>

                    <div className="px-2">
                        <img className="w-28 h-24" src={`./../public/${descriptionMeteo(currentDay.soir.weatherS)}`} alt="icone de la meteo " />
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