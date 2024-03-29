import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer } from "react-leaflet";
import { useMapEvent } from "react-leaflet/hooks";
import "../styles/MapView.css";
import { useEffect, useRef, useState } from "react";
import Markers from "./Markers.jsx";

const SetViewOnChange = ({ animateRef }) => {
  const map = useMapEvent("click", (e) => {
    map.setView(e.latlng, map.getZoom(), {
      animate: animateRef.current || false,
    });
  });

  return null;
};

const MapView = ({ name, lat, lon }) => {
  const animateRef = useRef(true);

  const [position, setPosition] = useState({ lat, lon });

  useEffect(() => {
    setPosition({ lat, lon });
  }, [lat, lon]);

  return (
    <MapContainer center={position} zoom={13}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Markers name={name} position={position} />
      <SetViewOnChange animateRef={animateRef} />
    </MapContainer>
  );
};

export default MapView;
