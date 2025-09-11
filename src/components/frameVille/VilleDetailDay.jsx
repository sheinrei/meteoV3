import { ButtonChangeToCurrentDay } from "./../button/buttonChangeToCurrentDay"
import { ButtonChangeToWeek } from "./../button/buttonChangeToWeek"
import { ButtonDeleteVille } from "./../button/buttonDeleatVille"
import { parseData } from "./../../parseData"
import { CarousselHourly } from "./CarousselHourly"

export function VilleDetailDay({ ville, onRemoveVille, meteoData, loading }) {



    if (loading) return <div className="flex gap-2">
        <p>Chargement...</p>
        <span className="loading loading-ring loading-xl"></span>
    </div>


    //function pour le slide decoupage en x
    function chunkArray(arr, size) {
        const chunks = [];
        for (let i = 0; i < arr.length; i += size) {
            chunks.push(arr.slice(i, i + size));
        }
        return chunks;
    }




    //traitement des données dans meteoData
    const villeData = parseData(meteoData)

    const blocsHours = chunkArray(villeData.daily.arrayTempDaily, 4);

    return <div key={villeData.nameVille} className="flex flex-col py-10 gap-5 border rounded-xl w-full items-center relative bg-white">

        <p>{villeData.nameVille}</p>

        <div className="flex gap-16">
            <p className="border px-2 rounded-xl bg-sky-200">Levé du jour : {villeData.daily.sunset}</p>
            <p className="border px-2 rounded-xl bg-sky-200">Couché du soleil : {villeData.daily.sunrise}</p>
        </div>


        {/* Caroussel pour faire defiler les data par tranche de 6 */}
        < CarousselHourly arrayHourly={blocsHours} data={villeData} />


        <div className="flex gap-2">
            <ButtonChangeToCurrentDay ville={ville} />
            <ButtonChangeToWeek ville={ville} />
            <ButtonDeleteVille onClick={() => onRemoveVille(ville)} />
        </div>
    </div>

}