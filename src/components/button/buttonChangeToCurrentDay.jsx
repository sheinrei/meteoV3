import {useSetFrameVille} from "./../../zustand/setFrame"

export function ButtonChangeToCurrentDay(ville) {

    const { setFrame } = useSetFrameVille()

    return <button
        onClick={()=> setFrame(ville.ville , "current")}
        className="border bg-sky-400 hover:bg-sky-500 rounded-full cursor-pointer px-2"
    >
        Retour

    </button>
}