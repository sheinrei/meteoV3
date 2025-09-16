import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import "../index.css";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});


export default function OSMMap({ lat = 43.6045, lng = 1.444 }) {

  const clientWidth = window.innerWidth;
  let dim;

  if (clientWidth < 768) {
    dim = "w-80";
  } else if (clientWidth < 1024) {
    dim = "w-100";
  } else {
    dim = "w-140";
  }


  return (
    <MapContainer center={[lat, lng]} zoom={6} className={`${dim} h-80 z-0`} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[lat, lng]} />
    </MapContainer>
  );
}