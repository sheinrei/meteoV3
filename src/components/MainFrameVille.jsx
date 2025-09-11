import { VilleCurrentData } from "./frameVille/VilleCurrentData"
import { VilleDetailDay } from "./frameVille/VilleDetailDay"
import { VilleDetailWeek } from "./frameVille/VilleDetailWeek"
import { useSetFrameVille } from "../zustand/setFrame";
import { useMeteo } from "../customHook/useFetchMeteo";
import { useEffect } from "react";


export default function MainFrameVille({ villes, onRemoveVille }) {

    const { villes: villesStore, addVille } = useSetFrameVille();
    const { meteoData, loading } = useMeteo(villes, onRemoveVille);


    //set l'affichage de la fenetre initial
    useEffect(() => {
        villes.forEach((v) => {
            if (!villesStore[v]) {
                addVille(v, "current");
            }
        });
    }, [villes, meteoData]);






    //retour conditionel selon villesStore.frame on renvois tel frame de la ville.
    return villes.map((v) => {

        const frame = villesStore[v]?.frame || "current";

        const dataBrut = localStorage.getItem(`Data-${v}`)
        const data = JSON.parse(dataBrut)
        
        if (loading || !data) {
            return <div key={v} className="flex gap-2">
                <p>Chargement de la ville...</p>
                <span className="loading loading-ring loading-xl"></span>
            </div>
        }



        if (frame === "current")
            return < VilleCurrentData
                key={v}
                ville={v}
                onRemoveVille={onRemoveVille}
                meteoData={data}
                loading={loading}
            />

        if (frame === "detailDay")
            return < VilleDetailDay
                key={v}
                ville={v}
                onRemoveVille={onRemoveVille}
                meteoData={data}
                loading={loading}
            />

        if (frame === "detailWeek")
            return < VilleDetailWeek
                key={v}
                ville={v}
                onRemoveVille={onRemoveVille}
                meteoData={data}
                loading={loading} />


        return null
    })

}

