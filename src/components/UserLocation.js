/**
 * Get the client's location
 * @returns - an array of size 2 representing the client's latitude/longitude
 * coordinate or -1 if an eror occured
 */
export function geoFindClient() {
    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };

    clientLocation = -1;
    function success(pos) {
        clientLocation[0] = pos.coords.latitude;
        clientLocation[1] = pos.coords.longitude;
    }

    function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    navigator.geolocation.getCurrentPosition(success, error, options);
    return clientLocation;
}