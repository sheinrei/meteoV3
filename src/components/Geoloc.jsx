import { useEffect, useState } from "react";

export default function Geoloc({ onAddVille }) {

    const [validator, setValidator] = useState(false)

    
    
    
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

                if (!listVille.includes(ville)){
                    onAddVille(ville);
                }
            } catch (err) {
                alert("Une erreur est survenue, nous ne pouvons pas ajouter votre position.");
            }
        };

        navigator.geolocation.getCurrentPosition(coords);
    }, [validator]);

    if (validator === false) {
        return (
            <div className="border bg-white rounded-xl">
                <p>
                    Vous pouvez accepter et ainsi laisser meteoV3 accéder à vos données de localisation
                    et vous afficher la ville où vous êtes actuellement.
                </p>
                <button className="btn" onClick={() => setValidator(true)}>Accepter</button>
            </div>
        )
    }

}
