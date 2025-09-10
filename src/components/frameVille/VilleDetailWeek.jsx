import { ButtonChangeToCurrentDay } from "./../button/buttonChangeToCurrentDay"
import { ButtonChangeToDetailDay } from "./../button/buttonChangeToDetailDay"






export function VilleDetailWeek({ ville, onRemoveVille, meteoData, loading }) {

    if (loading) return <div className="flex gap-2">
        <p>Chargement...</p>
        <span className="loading loading-ring loading-xl"></span>
    </div>

    return <div className="border bg-stone-200">
        < ButtonChangeToCurrentDay ville={ville} />
        < ButtonChangeToDetailDay ville={ville} />
        <p>Ici detail de la semaine</p>

    </div>
}