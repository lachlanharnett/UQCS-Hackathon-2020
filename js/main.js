var toilets = null;
var client = null;

function storeToilets(t) {
    toilets = t;
    tryStarting();
}

function storeLocation(l) {
    client = l;
    tryStarting();
}

function tryStarting() {
    if (toilets != null && client != null) {
        doMap();
    }
}

var limit = 1000000;

var url = "https://data.gov.au/data/api/3/action/datastore_search?resource_id=34076296-6692-4e30-b627-67b7c4eb1027&limit="
    + limit;
getToiletsFromGovt(url, storeToilets);

function getLocation() {
    geoFindClient(storeLocation);
}

function doMap(){
    var mymap = L.map('mapid').setView(client, 13);

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoibmIweWMzMyIsImEiOiJja2dkZmczczMwNmQ1MndwZ29mMTVidzk1In0.fv0DZlTYEdChhpcLDI8OtA'
    }).addTo(mymap);

    sortByStraight(toilets, client[0], client[1]);
    var toilet = toilets[0];
    plotRoute(mymap, client[0], client[1], toilet);
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
function plotRoute(map, lat, long, toilet) {
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
 * Get the client's location
 * @returns - an array of size 2 representing the client's latitude/longitude
 * coordinate or -1 if an eror occured
 */
function geoFindClient(callback) {
    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };

    result = -1;
    function success(pos) {
        result = [];
        result[0] = pos.coords.latitude;
        result[1] = pos.coords.longitude;
        callback(result);
    }

    function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    navigator.geolocation.getCurrentPosition(success, error, options);
}
function getJson(url, callback, toiletStorer) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
        var status = xhr.status;
        if (status === 200) {
            callback(null, xhr.response, toiletStorer);
        } else {
            callback(status, xhr.response, toiletStorer);
        }
    };
    xhr.send();
}

/**
 * Pull data from gov't website.
 * @param url - gov't website
 */
function getToiletsFromGovt(url, toiletStorer) {
    getJson(url, _getToiletsFromGovt, toiletStorer);
}

function _getToiletsFromGovt(status, response, toiletStorer) {
    var records =  response.result.records;
    var toilets = [];
    for (var i = 0; i < records.length; i++) {
        var toilet = [];
        var record = records[i];
        toilet[0] = record.Latitude;
        toilet[1] = record.Longitude;
        toilets[i] = toilet;
    }

    toiletStorer(toilets);
}

/**
 * Sort toilets by straight distance from client.
 * @param toilets - an array of lat long coordinates. specifically, this
 * is an array of length 2 arrays.
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
    return (a, b) => straightDistance(lat, long, a[0], a[1]) - straightDistance(lat, long, b[0], b[1]);
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
function straightDistance(lat1, lon1, lat2, lon2) {
    const R = 6373;
    var dlon = lon2 - lon1;
    var dlat = lat2 - lat1;
    var a = Math.pow(Math.sin(dlat/2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon/2), 2);
    var c = 2 * Math.atan2( Math.sqrt(a), Math.sqrt(1-a) );
    var d = R * c;
    return d;
}