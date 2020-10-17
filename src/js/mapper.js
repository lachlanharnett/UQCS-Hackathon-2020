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
 * Sort toilets by straight distance from client.
 * @param toilets - an array of lat long coordinates
 * @param lat - latitude of client
 * @param lat - longitude of client
 */
function sortByStraight(toilets, lat, long) {
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
function getToiletComparator(lat, long) {
    return (a, b) => straightDistance(lat, long, b[0], b[1]) - straightDistance(lat, long, a[0], a[1]);
}

/**
 * get the "straight" distance from one coordinate to another.
 * @param lat1
 * @param lon1
 * @param lat2
 * @param lon2
 * @returns {number}
 */
function straightDistance(lat1, lon1, lat2, lon2) {
    R = 6373;
    dlon = lon2 - lon1;
    dlat = lat2 - lat1;
    a = Math.pow(Math.sin(dlat/2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon/2), 2);
    c = 2 * Math.atan2( Math.sqrt(a), Math.sqrt(1-a) );
    d = R * c;
    return d;
}

function straightDistance2(lat1, lon1, lat2, lon2) {
    return Math.sqrt(Math.pow(lat1-lat2, 2) + Math.pow(lon1-lon2, 2));
}