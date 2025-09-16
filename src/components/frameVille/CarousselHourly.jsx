import { useState, useEffect } from "react"
import { descriptionMeteo } from "./../../function"

export function CarousselHourly({ data, arrayHourly, ville, splited }) {

    const blocsHours = arrayHourly;
    const arrayHumidity = data.daily.arrayHumidityDaily
    const arrayPrecipitation = data.daily.arrayPrecipitationDaily
    const arrayWeather = data.daily.arrayWeatherDaily
    const arrayWind = data.daily.arrayWindDaily

    // États pour l'animation
    const [isAnimating, setIsAnimating] = useState(false) // bloque l'animation pour pas spam
    const [direction, setDirection] = useState('') //direction de l'animation

    //Date pour fixer la bonne position au demarage
    const currentDate = new Date()
    const currentHour = currentDate.getHours()
    const currentIndex = Math.floor(currentHour / splited).toFixed(0)

    const [index, setIndex] = useState(parseInt(currentIndex))

    const prev = () => {

        if (isAnimating || index == 0) return
        setDirection('prev')
        setIsAnimating(true)
        setIndex(index === 0 ? 0 : index - 1)
    }

    const next = () => {
        if (isAnimating || index == blocsHours.length-1) return
        setDirection('next')
        setIsAnimating(true)
        setIndex(index === blocsHours.length - 1 ? blocsHours.length - 1 : index + 1)
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
        <div id={`dayly-${ville}`} className="flex gap-2 items-center justify-center">
            <button
                className="btn btn-circle"
                onClick={prev}
                disabled={isAnimating}
            >
                ❮
            </button>

            <div className="carousel-container overflow-hidden">
                <div className={`flex px-2 py-4 gap-4 transition-all duration-500 ease-out ${isAnimating ? (direction === 'next' ? 'animate-slide-next' : 'animate-slide-prev') : ''
                    }`}>
                    {blocsHours[index].map((e, i) => (
                        <div
                            key={`${index}-${i}`}
                            className={`flex border flex-col px-2 py-2 bg-sky-200 rounded-2xl items-center transition-all duration-300 hover:scale-105 hover:shadow-lg ${isAnimating ? 'animate-fade-in' : ''
                                }`}
                            style={{
                                animationDelay: `${i * 100}ms`
                            }}
                        >
                            <p className="animate-fade-in">{index * splited + i}h00</p>
                            <img
                                className="w-20 h-15 transition-transform duration-300 hover:scale-110"
                                src={descriptionMeteo(arrayWeather[index * splited + i])}
                                alt="image de la meteo"
                            />
                            <div className="flex flex-col">
                                <p className="animate-fade-in flex" style={{ animationDelay: `${i * 100 + 100}ms` }}>
                                    <img width="24" height="24" src="https://img.icons8.com/ultraviolet/24/temperature.png" alt="temperature" /> : {e}°C
                                </p>
                                <p className="animate-fade-in flex" style={{ animationDelay: `${i * 100 + 200}ms` }}>
                                    <img width="24" height="24" src="https://img.icons8.com/color/24/blur.png" alt="blur" /> : {arrayHumidity[index * splited + i]}%
                                </p>
                                <p className="animate-fade-in flex" style={{ animationDelay: `${i * 100 + 300}ms` }}>
                                    <img width="24" height="24" src="https://img.icons8.com/ultraviolet/40/hygrometer.png" alt="hygrometer" /> : {arrayPrecipitation[index * splited + i]}mm
                                </p>
                                <p className="animate-fade-in flex" style={{ animationDelay: `${i * 100 + 400}ms` }}>
                                    <img width="24" height="24" src="https://img.icons8.com/color/24/wind.png" alt="wind" /> : {arrayWind[index * 4 + i]}km/h
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