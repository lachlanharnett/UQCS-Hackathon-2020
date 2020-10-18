import L, { LatLng, LatLngTuple } from 'leaflet';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import React, { Component } from 'react';
import Home from '../pages/Home'

export class LeafMapEmbed extends Component {
    render() {
        var options = {
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 0
        };
    
        var clientLocation = [9999, 9999];

        function success(position: Position) {
            clientLocation.push(position.coords.latitude);
            clientLocation.push(position.coords.longitude);
        }
        
        function error() {
            console.warn('Error in geoFindClient');
            clientLocation[0] = 9999;
            clientLocation[1] = 9999;
        }
    
        navigator.geolocation.getCurrentPosition(success, error, options);
        
        let mapCenter = clientLocation as LatLngTuple;

        return (
            <Map center={mapCenter} zoom = {20}>
                <TileLayer
                url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'                
                />
            </Map>
        );
  }
}

// var map = new L.Map("leafmap");
// map.setView(position, 13);
// var layer = new L.TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', {foo: 'bar', attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'});
// layer.addTo(map);

// // add marker
// var marker = new L.Marker(new L.LatLng(51.5, -0.09));
// marker.addTo(map).bindPopup("<b>Hello world!</b><br />I am a popup.").openPopup();
