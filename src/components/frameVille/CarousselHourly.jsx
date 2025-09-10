import { useState } from "react"
import { descriptionMeteo } from "./../../function"

export function CarousselHourly({ data, arrayHourly }) {


    const blocsHours = arrayHourly;
    const arrayHumidity = data.daily.arrayHumidityDaily
    const arrayPrecipitation = data.daily.arrayPrecipitationDaily
    const arrayWeather = data.daily.arrayWeatherDaily
    const arrayWind = data.daily.arrayWindDaily


    const prev = () => setIndex(index === 0 ? blocsHours.length - 1 : index - 1)
    const next = () => setIndex(index === blocsHours.length - 1 ? 0 : index + 1)

    const currentDate = new Date()
    const currentHour = currentDate.getHours()
    const currentIndex = Math.floor(currentHour / 4).toFixed(0)
    const [index, setIndex] = useState(parseInt(currentIndex))

    return (
        <div className="flex gap-4 items-center justify-center">
            <button className="btn btn-circle" onClick={prev}>❮</button>

            {
                blocsHours[index].map((e, i) => (
                    <div key={index+i} className="flex flex-col bg-sky-200 rounded-2xl">
                        <p>{index * 4 + i}h00</p>
                        <img className="w-20 h-15" src={"./../" + descriptionMeteo(arrayWeather[index * 4 + i])} alt="image de la meteo" />
                        <p>Température : {e}°C</p>
                        <p>Humidité : {arrayHumidity[index * 4 + i]}%</p>
                        <p>Précipitation : {arrayPrecipitation[index * 4 + i]}mm</p>
                        <p>Vent : {arrayWind[index * 4 + i]}km/h</p>
                    </div>
                ))
            }

            <button className="btn btn-circle" onClick={next}>❯</button>
        </div>
    )

}
