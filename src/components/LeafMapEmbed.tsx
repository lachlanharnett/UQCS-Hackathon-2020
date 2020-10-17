import L from 'leaflet';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import React, { Component } from 'react';
import { LatLngTuple } from 'leaflet';

export class LeafMapEmbed extends React.Component {
    
    defaultLocation: LatLngTuple = [51.505, -0.09];

    render() {
        // const position = [this.state.lat, this.state.lng];
        return (
        <Map center={this?.defaultLocation} zoom = {13}>
            <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
            />
        </Map>
        );
  }
}
