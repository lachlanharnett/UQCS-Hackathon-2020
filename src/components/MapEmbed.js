import React from 'react'
import L from 'leaflet';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import { clientLocation } from './UserLocation'

if (clientLocation() != -1) {
  const position = clientLocation();

  const map = (
    <Map center={position} zoom={13}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
      />
      <Marker position={position}>
        <Popup>A pretty CSS3 popup.<br />Easily customizable.</Popup>
      </Marker>
    </Map>
  )
  
  render(map, document.getElementById('map-container'))
} 
