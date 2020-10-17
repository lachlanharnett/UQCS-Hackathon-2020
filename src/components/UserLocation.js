/**
 * Get the client's location
 * @returns - an array of size 2 representing the client's latitude/longitude
 * coordinate 
 */
export function geoFindClient() {
    var options = {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0
    };

    var clientLocation = new Array(2);
    function success(position) {
        clientLocation.push(position.coords.latitude);
        clientLocation.push(position.coords.longitude);
    }

    function error() {
        console.warn('Error in geoFindClient');
        clientLocation[0] = 9999;
        clientLocation[1] = 9999;
    }

    navigator.geolocation.getCurrentPosition(success, error, options);

    return clientLocation;
    
}