import { descriptionMeteo } from "./function"


export function parseData(data) {


    const villeData = data

    const update = villeData.lastUpdate


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



        const indexAm = [i * 24 , i * 24 + 11]
        const indexPM = [i * 24 + 12, i * 24 + 23]

        const tempAm = Math.max(...villeData.meteo.hourly.temperature_2m.slice(indexAm[0], indexAm[1]))
        const tempPm = Math.max(...villeData.meteo.hourly.temperature_2m.slice(indexPM[0], indexPM[1]))

        
        const humidityAm = villeData.meteo.hourly.relative_humidity_2m.slice(indexAm[0], indexAm[1]).reduce((a, b) => (a + b)) / 12
        const humidityPm = villeData.meteo.hourly.relative_humidity_2m.slice(indexPM[0], indexPM[1]).reduce((a, b) => (a + b)) / 12
        

        const windAm = villeData.meteo.hourly.wind_speed_10m.slice(indexAm[0], indexAm[1]).reduce((a, b) => (a + b)) / 12
        const windPm = villeData.meteo.hourly.wind_speed_10m.slice(indexPM[0], indexPM[1]).reduce((a, b) => (a + b)) / 12


        const precipitationAm = villeData.meteo.hourly.precipitation.slice(indexAm[0], indexAm[1]).reduce((a, b) => a + b).toFixed(1)
        const precipitationPm = villeData.meteo.hourly.precipitation.slice(indexPM[0], indexPM[1]).reduce((a, b) => a + b).toFixed(1)


        const weatherCodesAm = villeData.meteo.hourly.weather_code.slice(indexAm[0], indexAm[1]);
        const weatherAm = weatherCodesAm.sort((a, b) =>
            weatherCodesAm.filter(v => v === a).length - weatherCodesAm.filter(v => v === b).length
        ).pop();

        const weatherCodesPm = villeData.meteo.hourly.weather_code.slice(indexPM[0], indexPM[1]);
        const weatherPm = weatherCodesPm.sort((a, b) =>
            weatherCodesPm.filter(v => v === a).length - weatherCodesPm.filter(v => v === b).length
        ).pop();




        const o = {
            day: {
                sunset: villeData.meteo.daily.sunset.map((e) => e.split("T")[1].replace(":", "h")),
                sunrise: villeData.meteo.daily.sunrise.map((e) => e.split("T")[1].replace(":", "h")),
                currentDay,

            },
            matin: {
                temp: tempAm,
                weather: weatherAm,
                humidity: humidityAm,
                precipitation: precipitationAm,
                wind: windAm,
            },
            apresMidi: {
                temp: tempPm,
                weather: weatherPm,
                humidity: humidityPm,
                precipitation: precipitationPm,
                wind: windPm,
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
        update,
        week: arrayWeek
    }
}