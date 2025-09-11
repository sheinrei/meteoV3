import {useSetFrameVille} from "./../../zustand/setFrame"

export function ButtonChangeToDetailDay(ville){

    const { setFrame } = useSetFrameVille()

    

    return <button
        onClick={()=>setFrame(ville.ville,"detailDay")}
        className="border bg-sky-500 hover:bg-sky-600 rounded-full cursor-pointer px-2"
    >
        Détail de la journée

    </button>
}