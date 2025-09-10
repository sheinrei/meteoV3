import {useState} from "react"


export default function SearchVille({onAddVille}) {
    const [value, setValue] = useState("")

    const handleChange = (e) => {
        setValue(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (value.length < 1)return

        onAddVille(value);
        setValue("");
    }


    return <div className="w-max">
        <form onSubmit={handleSubmit} className="bg-stone-200 w-xs border flex justify-center items-center gap-5">
            <input 
            type="text"
            value={value}
            onChange={handleChange}
            className="bg-sky-50"
            placeholder="Chercher une ville ..."
            />

            <button
                type="submit"
                className="bg-sky-500 rounded-sm py-2 px-3 hover:bg-sky-800"
            >Envoyer</button>
        </form>
    </div>
}