import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import IconLocation from "./IconLocation.jsx";

const Markers = ({name, position}) => {
  return (
    <Marker position={position} icon={IconLocation}>
        <Popup>{name}</Popup>
    </Marker>
  )
}

export default Markers