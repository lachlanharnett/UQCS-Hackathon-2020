import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonInput, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import React, { useState } from 'react';
import './Home.css';
import '../components/GmapsAPI';
import logo from '../images/logo.svg';
import L from 'leaflet';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';

//import {HTTP} from '@ionic-native/http';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import GmapsAPI from '../components/GmapsAPI';
import axios from 'axios';

/**
 * The home component. Gets toilet data and other shit
 */
const Home: React.FC = () => {

  const [location, setLocation] = useState('');
  //const toiletData = HTTP.get(`https://data.gov.au/data/api/3/action/datastore_search?resource_id=100da45f-6d1d-40ad-8c47-5a0481f1fbf9&q=`, location, null);


  //To query, go website&q='suburb' 
  //WE MUST MAKE THEM PUT IN A SUBURB FOR BASIC DEMONSTRATION PURPOSES BECAUSE WE DON'T HAVE TIME TO MAKE OTHER OPTIONS WORK.
  const toiletGovernmentSite = "https://data.gov.au/data/api/3/action/datastore_search?resource_id=100da45f-6d1d-40ad-8c47-5a0481f1fbf9&q=";

  /**
   * 
   * @param length The largest entry number in the function. Cannot be negative
   */
  function createArray(length: number) {
    if (length < 0) { return null; }
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
  function retrieveToiletData() {
    const parsingString = `${toiletGovernmentSite}${location}`;
    console.log(parsingString);

    var JSONDATA;

    //Get the JSON objects
    //THIS IS CORRECTLY PULLING THE GOVERNMENT DATASHEETS.
    const output = axios.get(parsingString)
      .then (function(response: any) {
        console.log(response);
        JSONDATA = response;
        //console.log(output);
        console.log("_____________________________________")

        //Successful
        console.log(JSONDATA?.data.result.records[1]);
        console.log(JSONDATA?.data.result.records[1].Latitude);
        

        //initialise the 2D array here
        var LatLongArray = createArray(JSONDATA?.data.result.total);
        console.log(LatLongArray);

        //Now that we have the array
        //Find out the user location
        

      })
      .catch(function(error: any) {
        console.log(error);
      })

      

    //console.log(output);

    
  }
  
  function addToiletData() {

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
          <IonRow>
            <IonCol>
              <div className="main-container">
                <IonButton onClick={ () => retrieveToiletData()} class="button" expand="block">Allow access to location</IonButton>
                <p className="text">or</p>
                <IonInput placeholder="Enter Location" class="text" type="text" onIonChange ={(e: any) => setLocation(e.target.value)}></IonInput>
                <IonButton type="submit">Submit Location</IonButton>
              </div>
              <div className="add-toilet">
                <p className="text">Are we missing a toilet?</p>
                <IonButton onClick={ () => addToiletData()} expand="block" class="button">Add toilet location</IonButton>
              </div>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
      
    </IonPage>
  );
};

export default Home;
