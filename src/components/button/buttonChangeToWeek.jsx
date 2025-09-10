import { useSetFrameVille } from "../../zustand/setFrame"

export function ButtonChangeToWeek(ville) {

    const { setFrame } = useSetFrameVille()


    return <button
        //onClick={() => setFrame("detailWeek")}
        onClick={()=> setFrame(ville.ville, "detailWeek")}
        className="border bg-sky-500 rounded-full cursor-pointer px-2"
    >
        Detail sur 7 jours

    </button>
}