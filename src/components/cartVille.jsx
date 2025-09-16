
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

  return (
    <div className="w-full bg-white">
      <MapContainer
        center={[lat, lng]}
        zoom={6}
        className="h-64 w-full"
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[lat, lng]} />
      </MapContainer>
    </div>
  );
}