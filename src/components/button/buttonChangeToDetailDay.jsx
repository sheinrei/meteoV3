import {useSetFrameVille} from "./../../zustand/setFrame"

export function ButtonChangeToDetailDay(ville){

    const { setFrame } = useSetFrameVille()

    

    return <button
        onClick={()=>setFrame(ville.ville,"detailDay")}
        className="border bg-sky-400 hover:bg-sky-500 rounded-full cursor-pointer px-2"
    >
        Détail de la journée

    </button>
}