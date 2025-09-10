import { descriptionMeteo } from "./function"


export function parseData(data) {

    
    const villeData = data

    const nameVille = villeData.name
    const coord = villeData.coord

    //current
    const sunset = villeData.meteo.daily.sunset[0].split("T")[1].replace(":", "h")
    const sunrise = villeData.meteo.daily.sunrise[0].split("T")[1].replace(":", "h")


    const currentTemperature = villeData.meteo.current.temperature_2m;
    const currentPrecipitation = villeData.meteo.current.precipitation;
    const currentHumidity = villeData.meteo.current.relative_humidity_2m;
    const currentWeather = descriptionMeteo(villeData.meteo.current.weather_code);


    //daily
    const tempDaily = villeData.meteo.hourly.temperature_2m.slice(0, 24);
    const tempMini = Math.min(...tempDaily)
    const tempMaxi = Math.max(...tempDaily)

    const arrayTempDaily = villeData.meteo.hourly.temperature_2m.slice(0, 24);
    const arrayHumidityDaily = villeData.meteo.hourly.relative_humidity_2m.slice(0, 24)
    const arrayPrecipitationDaily = villeData.meteo.hourly.precipitation.slice(0, 24)
    const arrayWeatherDaily = villeData.meteo.hourly.weather_code.slice(0, 24)
    const arrayWindDaily = villeData.meteo.hourly.wind_speed_10m.slice(0, 24)


    //weekly
    return {
        nameVille,
        coord,
        current: {
            currentTemperature,
            currentPrecipitation,
            currentHumidity,
            currentWeather
        },
        
        daily: {
            sunset,
            sunrise,
            tempMini,
            tempMaxi,
            arrayTempDaily,
            arrayHumidityDaily,
            arrayPrecipitationDaily,
            arrayWeatherDaily,
            arrayWindDaily,
        },

        week: {
            aRemplir: null,
        }
    }
}