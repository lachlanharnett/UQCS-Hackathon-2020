/**
 * Get the client's location
 * @returns - an array of size 2 representing the client's latitude/longitude
 * coordinate or -1 if an eror occured
 */
function geoFindClient() {
    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };

    result = -1;
    function success(pos) {
        result[0] = pos.coords.latitude;
        result[1] = pos.coords.longitude;
    }

    function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    navigator.geolocation.getCurrentPosition(success, error, options);
    return result;
}