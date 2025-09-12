import { useState, useEffect } from "react"
import { descriptionMeteo } from "./../../function"

export function CarousselHourly({ data, arrayHourly, ville }) {
    const blocsHours = arrayHourly;
    const arrayHumidity = data.daily.arrayHumidityDaily
    const arrayPrecipitation = data.daily.arrayPrecipitationDaily
    const arrayWeather = data.daily.arrayWeatherDaily
    const arrayWind = data.daily.arrayWindDaily

    // États pour l'animation
    const [isAnimating, setIsAnimating] = useState(false) // bloque l'animation pour non spam btn
    const [direction, setDirection] = useState('') //direction de l'animation

    //Date pour fixer la bonne position au demarage
    const currentDate = new Date()
    const currentHour = currentDate.getHours()
    const currentIndex = Math.floor(currentHour / 4).toFixed(0)
    const [index, setIndex] = useState(parseInt(currentIndex))

    const prev = () => {

        if (isAnimating) return
        setDirection('prev')
        setIsAnimating(true)
        setIndex(index === 0 ? blocsHours.length - 1 : index - 1)
    }

    const next = () => {
        if (isAnimating) return
        setDirection('next')
        setIsAnimating(true)
        setIndex(index === blocsHours.length - 1 ? 0 : index + 1)
    }



    useEffect(() => {
        if (isAnimating) {
            const timer = setTimeout(() => {
                setIsAnimating(false)
            }, 500)
            return () => clearTimeout(timer)
        }
    }, [isAnimating])



    return (
        <div id={`dayly-${ville}`} className="flex gap-4 items-center justify-center">
            <button
                className="btn btn-circle"
                onClick={prev}
                disabled={isAnimating}
            >
                ❮
            </button>

            <div className="carousel-container overflow-hidden">
                <div className={`flex gap-4 transition-all duration-500 ease-out ${isAnimating ? (direction === 'next' ? 'animate-slide-next' : 'animate-slide-prev') : ''
                    }`}>
                    {blocsHours[index].map((e, i) => (
                        <div
                            key={`${index}-${i}`}
                            className={`flex flex-col bg-sky-200 rounded-2xl items-center transition-all duration-300 hover:scale-105 hover:shadow-lg ${isAnimating ? 'animate-fade-in' : ''
                                }`}
                            style={{
                                animationDelay: `${i * 100}ms`
                            }}
                        >
                            <p className="animate-fade-in">{index * 4 + i}h00</p>
                            <img
                                className="w-20 h-15 transition-transform duration-300 hover:scale-110"
                                src={"./../" + descriptionMeteo(arrayWeather[index * 4 + i])}
                                alt="image de la meteo"
                            />
                            <div className="flex flex-col">
                                <p className="animate-fade-in" style={{ animationDelay: `${i * 100 + 100}ms` }}>
                                    Température : {e}°C
                                </p>
                                <p className="animate-fade-in" style={{ animationDelay: `${i * 100 + 200}ms` }}>
                                    Humidité : {arrayHumidity[index * 4 + i]}%
                                </p>
                                <p className="animate-fade-in" style={{ animationDelay: `${i * 100 + 300}ms` }}>
                                    Précipitation : {arrayPrecipitation[index * 4 + i]}mm
                                </p>
                                <p className="animate-fade-in" style={{ animationDelay: `${i * 100 + 400}ms` }}>
                                    Vent : {arrayWind[index * 4 + i]}km/h
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <button
                className="btn btn-circle"
                onClick={next}
                disabled={isAnimating}
            >
                ❯
            </button>
        </div>
    )
}