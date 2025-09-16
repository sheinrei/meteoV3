import { useState } from "react"


export default function SearchVille({ onAddVille }) {
    const [value, setValue] = useState("")

    const handleChange = (e) => {
        setValue(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (value.length < 1) return

        onAddVille(value);
        setValue("");
    }

    const clientWidth = window.innerWidth
    let width;
    if (clientWidth <= 764) {
        width = "130"
    } else if (clientWidth > 764 && clientWidth < 1024) {
        width = "150"
    } else {
        width = "300"
    }


    return <div className={`w-${width} flex justify-center`}>
        <form onSubmit={handleSubmit} className="bg-white border rounded-xl flex px-2">
            <input
                type="text"
                value={value}
                onChange={handleChange}
                className="focus:outline-none hover:bg-stone-100 cursor-pointer"
                placeholder="Chercher une ville ..."
            />

            <button
                type="submit"
                className="rounded-sm py-2 px-3 rounded-full cursor-pointer"
            ><img width="30" height="30" src="https://img.icons8.com/stickers/100/search.png" alt="search" /></button>
        </form>
    </div>
}