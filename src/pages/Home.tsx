import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonInput, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import React, { useState } from 'react';
import './Home.css';
import logo from '../images/logo.svg';
import L from 'leaflet';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import {Geolocation} from '@ionic-native/geolocation';
import {LeafMapEmbed} from '../components/LeafMapEmbed'

//import {HTTP} from '@ionic-native/http';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
//import GmapsAPI from '../components/GmapsAPI';
import axios from 'axios';

/**
 * The home component. Gets toilet data and other shit
 */
const Home: React.FC = () => {
  var googleMapsURL: React.SetStateAction<string>;

  const [location, setLocation] = useState('');
  const [userLocation, setUserLocation] = useState('');
  const [userText, setUserText] = useState('FIND NEAREST TOILET');
  //const toiletData = HTTP.get(`https://data.gov.au/data/api/3/action/datastore_search?resource_id=100da45f-6d1d-40ad-8c47-5a0481f1fbf9&q=`, location, null);


  //To query, go website&q='suburb' 
  //WE MUST MAKE THEM PUT IN A SUBURB FOR BASIC DEMONSTRATION PURPOSES BECAUSE WE DON'T HAVE TIME TO MAKE OTHER OPTIONS WORK.
  const toiletGovernmentSite = "https://data.gov.au/data/api/3/action/datastore_search?resource_id=100da45f-6d1d-40ad-8c47-5a0481f1fbf9&q=";

  /**
   * 
   * @param length The largest entry number in the function. Cannot be negative
   */
  function createArray(length: number) {
    
    var arr = new Array(length);
    //Rows are Latitude, Columns are Longitude.
    for (var i = 0; i < arr.length; i++) {
      arr[i] = new Array(2);
    }
    return arr;
  }



  /**
   * THIS GRABS THE DATA FROM THE GOVERNMENT DATABASE. 
   * REQUIRES YOU TO PUSH 'ALLOW ACCESS TO LOCATION' BUTTON!!!
   */
  async function retrieveToiletData() {
    const parsingString = `${toiletGovernmentSite}${location}`;
    console.log(parsingString);

    var JSONDATA;

    //Get the JSON objects
    //THIS IS CORRECTLY PULLING THE GOVERNMENT DATASHEETS.
    const output = axios.get(parsingString)
      .then (async function(response: any) {
        
        JSONDATA = response;
        //console.log(output);
        console.log("_____________________________________")

        //Successful
        console.log(JSONDATA?.data.result.records[1]);
        //console.log(JSONDATA?.data.result.records[1].Latitude);
        

        //initialise the 2D array here
        var LatLongArray = createArray(JSONDATA?.data.result.total);
        //console.log(LatLongArray);


        var newClientLocation = await Geolocation.getCurrentPosition();
        
        //console.log(newClientLocation.coords.latitude, newClientLocation.coords.longitude);

        //Initialise the arrays for later comparison
        for (var i = 0; i < JSONDATA?.data.result.total; i++) {
            LatLongArray[i][0] = JSONDATA?.data.result.records[i].Latitude;

            LatLongArray[i][1] = JSONDATA?.data.result.records[i].Longitude;
        }

      
        //console.log(LatLongArray);
        var minShitterValue = findShortestPath(newClientLocation.coords.latitude, newClientLocation.coords.longitude, LatLongArray);
        console.log("Your location", newClientLocation.coords.latitude, newClientLocation.coords.longitude);
        var nearestToiletPosition = LatLongArray[minShitterValue];
        console.log("Nearest Toilet co-ords", nearestToiletPosition);

        //Time to create the string that the user will click on.
        var googleMapsString = `https://www.google.com/maps/dir/?api=1&origin=${newClientLocation.coords.latitude},${newClientLocation.coords.longitude}&destination=${nearestToiletPosition[0]},${nearestToiletPosition[1]}`;
        console.log(googleMapsString);
        googleMapsURL = googleMapsString;



      }).catch(async function(error: any) {
          console.log("error");
      })
  }


  
      
  /**
   * Returns the entry that is the shortest distance.
   * @param currentLat The user's current latitude
   * @param currentLong  The users's current longitude
   * @param bulkCoordinates The 2D array of values
   */
  function findShortestPath(currentLat: number, currentLong: number, bulkCoordinates: Array<Array<number>>) {
    var tempLength = new Array(bulkCoordinates.length);
    
    for (var i = 0; i < bulkCoordinates.length; i++) {
      tempLength[i] = pythagoreanTriangle(currentLat, currentLong, bulkCoordinates[i][0], bulkCoordinates[i][1]);
    }

    console.log(tempLength);
    //EACH ENTRY FOR THE TEMPLENGTH CORRESPONDS WITH THE ENTRY IN THE DOUBLE ARRAY.
    //Gotta put in the algorithm to find the shortest entry here.
    //O(n^2) time complexity.
    var currentMin = tempLength[0];
    for (var k = 1; k < tempLength.length; k++) {
      if(currentMin > tempLength[k]) {
        currentMin = tempLength[k];
      }
    }

    //console.log(currentMin);

    var minShitterEntry = 0;
    //Now go back through the array and find which entry it was.
    for (var iterator = 0; iterator < tempLength.length; iterator++) {
      if (currentMin === tempLength[iterator]) {
        minShitterEntry = iterator;
        break;
      }
    }
    
    //BULKCOORDINATES FOR MINSHITTERENTRY IS WHAT WE NEED TO BE USING TO ENTER INTO THE API.
    //console.log(minShitterEntry, currentMin, bulkCoordinates[minShitterEntry]);


    function pythagoreanTriangle(userLat: number, userLong: number, compareLat: number, compareLong: number) {
      const R = 6373;
      var dlon = compareLong - userLong;
      var dlat = compareLat- userLat;
      var a = Math.pow(Math.sin(dlat/2), 2) + Math.cos(userLat) * Math.cos(compareLat) * Math.pow(Math.sin(dlon/2), 2);
      var c = 2 * Math.atan2( Math.sqrt(a), Math.sqrt(1-a) );
      var d = R * c;
      return d;
      //return Math.sqrt(Math.pow(userLat-compareLat, 2) + Math.pow(userLong-compareLong, 2));
    }

    return minShitterEntry;
  }
  


  function addToiletData() {
    //Does nothing right now
  }
  

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar class="header">
          <IonTitle class="ion-text-center" size="large">BUSTING</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent class="background">
        <IonGrid class="ion-text-center">
          <IonRow class="map-container">
            <LeafMapEmbed/>
            <IonCol>
              <div className="main-container">
                <IonInput placeholder="Enter the city/town you live in. Will not work otherwise" class="text" type="text" onIonChange ={(e: any) => {setLocation(e.target.value);}}></IonInput>
                <IonButton type="submit" onClick= {() => {retrieveToiletData();}}> FIND A TOILET</IonButton>
                <p className="text">Are we missing a toilet?</p>
                <IonButton onClick={ () => {console.log("Works")}} expand="block" class="button">ADD NEW ENTRY</IonButton>
              </div>
            </IonCol>            
          </IonRow>
          <IonRow>
            <IonTitle size="large"> <h1>Busting for a piss? Maybe something else? We've got you covered</h1></IonTitle>
          </IonRow>
          
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Home;
