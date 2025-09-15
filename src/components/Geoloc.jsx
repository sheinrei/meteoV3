import { useEffect, useState } from "react";

export default function Geoloc({ onAddVille }) {

    const [validator, setValidator] = useState(false)

    const [decline, setDecline] = useState(() => localStorage.getItem("geoloc") || false);

    const updateDecline = (value) => {
        setDecline(value);
        localStorage.setItem("geoloc", value);
    };


    useEffect(() => {
        if (!navigator.geolocation || !validator) return;

        const coords = async (pos) => {
            const lat = pos.coords.latitude;
            const lon = pos.coords.longitude;

            try {
                const res = await fetch(
                    `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
                );
                const data = await res.json();

                const ville = data.address.village;
                const listVille = localStorage.getItem("ville")

                if (!listVille.includes(ville)) {
                    onAddVille(ville);
                }
            } catch (err) {
                alert("Une erreur est survenue, nous ne pouvons pas ajouter votre position.");
            }
        };

        navigator.geolocation.getCurrentPosition(coords);
    }, [validator]);



    if (validator === false && !decline) {
        return (
            <div className="border w-150 bg-white rounded-xl flex flex-col gap-2 p-2">
                <p>
                    Pour permettre à meteoV3 d’accéder à votre localisation et d’afficher votre ville actuelle, acceptez simplement en &nbsp;
                    <button className="text-blue-500 hover:text-blue-700 underline cursor-pointer" onClick={() => setValidator(true)}>cliquant-ici</button>
                .</p>



                <div>
                    <p>Si vous ne souhaitez plus afficher ce message &nbsp;
                        <button className="text-blue-500 hover:text-blue-700 underline cursor-pointer" onClick={() => updateDecline(true)}>cliquez-içi</button>
                    .</p>

                </div>

            </div>
        )
    }

}
