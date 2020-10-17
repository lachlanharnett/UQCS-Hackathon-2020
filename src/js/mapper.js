/**
 * Display on the given map the nearby toilets, directions to the nearest
 * toilet, etc from the given latitude and longitude
 * @param map - the map we want to display on
 * @param lat - the latitude of origin
 * @param long - the longitude of origin
 */
function main(map, lat, long) {

}

/**
 * plot a route from the client's location (given by lat and long)
 * to the given toilet
 * @param map
 * @param lat - latitude of the client
 * @param long - longitude of the client
 * @param toilet - a length 2 array representing the location
 * of the given toilet by lat/long
 */
export function plotRoute(map, lat, long, toilet) {
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    L.Routing.control({
        waypoints: [
            L.latLng(lat, long),
            L.latLng(toilet[0], toilet[1])
        ],
        routeWhileDragging: true
    }).addTo(map);
}

/**
 * Sort toilets by straight distance from client.
 * @param toilets - an array of lat long coordinates. specifically, this
 * is an array of length 2 arrays.
 * @param lat - latitude of client
 * @param lat - longitude of client
 */
export function sortByStraight(toilets, lat, long) {
    toilets.sort(getToiletComparator(lat, long));
}

/**
 * get a comparator function that we may use with Array.sort()
 * the comparator compares coordinates by straight distance to the given
 * latitude and longitude coordinate
 * @param lat
 * @param long
 * @returns {function(*, *): number}
 */
export function getToiletComparator(lat, long) {
    return (a, b) => straightDistance(lat, long, b[0], b[1]) - straightDistance(lat, long, a[0], a[1]);
}

/**
 * get the "straight" distance from one coordinate to another. takes
 * into account that the earth is round.
 * @param lat1
 * @param lon1
 * @param lat2
 * @param lon2
 * @returns {number}
 */
export function straightDistance(lat1, lon1, lat2, lon2) {
    const R = 6373;
    var dlon = lon2 - lon1;
    var dlat = lat2 - lat1;
    var a = Math.pow(Math.sin(dlat/2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon/2), 2);
    var c = 2 * Math.atan2( Math.sqrt(a), Math.sqrt(1-a) );
    var d = R * c;
    return d;
}

/**
 * fallback function in case straightDistance is not suitable.
 * @param lat1
 * @param lon1
 * @param lat2
 * @param lon2
 * @returns {number}
 */
export function straightDistance2(lat1, lon1, lat2, lon2) {
    return Math.sqrt(Math.pow(lat1-lat2, 2) + Math.pow(lon1-lon2, 2));
}

