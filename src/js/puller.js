function getJson(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
        var status = xhr.status;
        if (status === 200) {
            callback(null, xhr.response);
        } else {
            callback(status, xhr.response);
        }
    };
    xhr.send();
}

/**
 * Pull data from gov't website.
 * @param url - gov't website
 */
function getToiletsFromGovt(url) {
    getJson(url, _getToiletsFromGovt);
}

function _getToiletsFromGovt(status, response) {
    var records =  response.result.records;
    var toilets = [];
    for (var i = 0; i < records.length; i++) {
        var toilet = [];
        var record = records[i];
        toilet[0] = record.Latitude;
        toilet[1] = record.Longitude;
        toilets[i] = toilet;
    }
    //need to return this somehow
}