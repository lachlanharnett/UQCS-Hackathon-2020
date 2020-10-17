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
    function success(pos) {
        clientLocation.push(pos?.coords.latitude);
        clientLocation.push(pos?.coords.longitude);
        //console.log(clientLocation[0], clientLocation[1]);
        

    }

    function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
        clientLocation[0] = 9999;
        clientLocation[1] = 9999;

    }


    navigator.geolocation.getCurrentPosition(success, error, options);
    
    
    
    return clientLocation;
    
}