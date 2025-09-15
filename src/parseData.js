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
    const tempMini = Math.min(...tempDaily);
    const tempMaxi = Math.max(...tempDaily);

    const arrayTempDaily = villeData.meteo.hourly.temperature_2m.slice(0, 24);
    const arrayHumidityDaily = villeData.meteo.hourly.relative_humidity_2m.slice(0, 24);
    const arrayPrecipitationDaily = villeData.meteo.hourly.precipitation.slice(0, 24);
    const arrayWeatherDaily = villeData.meteo.hourly.weather_code.slice(0, 24);
    const arrayWindDaily = villeData.meteo.hourly.wind_speed_10m.slice(0, 24);


    //weekly
    const arrayWeek = [];
    for (let i = 0; i < 7; i++) {

        const arrayJour = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
        const arrayMois = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];

        const today = new Date();

        const futureDate = new Date(today);
        futureDate.setDate(today.getDate() + i); 

        const day = arrayJour[futureDate.getDay()]; 
        const dayNumber = futureDate.getDate();
        const month = arrayMois[futureDate.getMonth()];
        const year = today.getFullYear()
        const currentDay = `${day} ${dayNumber} ${month} ${year}`;



        const indexM = [i * 24, i * 24 + 12]
        const indexS = [i * 24 + 12, i * 24 + 24]
        const tempM = Math.max(...villeData.meteo.hourly.temperature_2m.slice(indexM[0], indexM[1]))
        const tempS = Math.max(...villeData.meteo.hourly.temperature_2m.slice(indexS[0], indexS[1]))

        const humidityM = villeData.meteo.hourly.relative_humidity_2m.slice(indexM[0], indexM[1]).reduce((a, b) => (a + b)) / 12
        const humidityS = villeData.meteo.hourly.relative_humidity_2m.slice(indexS[0], indexS[1]).reduce((a, b) => (a + b)) / 12

        const windM = villeData.meteo.hourly.wind_speed_10m.slice(indexM[0], indexM[1]).reduce((a, b) => (a + b)) / 12
        const windS = villeData.meteo.hourly.wind_speed_10m.slice(indexS[0], indexS[1]).reduce((a, b) => (a + b)) / 12

        const precipitationM = villeData.meteo.hourly.precipitation.slice(indexM[0], indexM[1]).reduce((a, b) => a + b).toFixed(1)
        const precipitationS = villeData.meteo.hourly.precipitation.slice(indexS[0], indexS[1]).reduce((a, b) => a + b).toFixed(1)

        const weatherCodesM = villeData.meteo.hourly.weather_code.slice(indexM[0], indexM[1]);
        const weatherM = weatherCodesM.sort((a, b) =>
            weatherCodesM.filter(v => v === a).length - weatherCodesM.filter(v => v === b).length
        ).pop();

        const weatherCodesS = villeData.meteo.hourly.weather_code.slice(indexS[0], indexS[1]);
        const weatherS = weatherCodesS.sort((a, b) =>
            weatherCodesS.filter(v => v === a).length - weatherCodesS.filter(v => v === b).length
        ).pop();

        const o = {
            day: {
                sunset: villeData.meteo.daily.sunset.map((e) => e.split("T")[1].replace(":", "h")),
                sunrise: villeData.meteo.daily.sunrise.map((e) => e.split("T")[1].replace(":", "h")),
                currentDay,

            },
            matin: {
                tempM,
                weatherM,
                humidityM,
                precipitationM,
                windM,
            },
            soir: {
                tempS,
                weatherS,
                humidityS,
                precipitationS,
                windS,
            }
        }
        arrayWeek.push(o)
    }





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

        week: arrayWeek
    }
}