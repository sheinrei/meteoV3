import { useEffect, useState } from "react";





export default function Geoloc({ onAddVille }) {

    const [validator, setValidator] = useState(false)

    const [decline, setDecline] = useState(() => localStorage.getItem("geoloc") || false);

    const slideY = () => {
        const element = document.getElementById("frame-geoloc");
        let height = element.clientHeight;

        const handler = setInterval(() => {
            if (height <= 0) {
                clearInterval(handler);
                element.style.border = "none"
                element.style.padding = "0px"
            } else {
                height -= 4; 
                element.style.height = height + "px";
            }
        }, 42)
    }



    const updateDecline = (value) => {
        slideY()
        setTimeout(() => {
            setDecline(value);
            localStorage.setItem("geoloc", value);
        }, 2000)
    };



    useEffect(() => {
        if (!navigator.geolocation || !validator) return;

        slideY()
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
            <div id="frame-geoloc" className="border w-150 bg-white rounded-xl flex flex-col gap-2 p-2 overflow-hidden">
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
