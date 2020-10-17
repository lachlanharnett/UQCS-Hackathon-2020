import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonInput, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import React, { useState } from 'react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
import '../components/GmapsAPI';

//import {HTTP} from '@ionic-native/http';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import GmapsAPI from '../components/GmapsAPI';
import axios from 'axios';

const Home: React.FC = () => {

  

  const [location, setLocation] = useState('');
  //const toiletData = HTTP.get(`https://data.gov.au/data/api/3/action/datastore_search?resource_id=100da45f-6d1d-40ad-8c47-5a0481f1fbf9&q=`, location, null);



  //To query, go website&q='suburb' 
  //WE MUST MAKE THEM PUT IN A SUBURB FOR BASIC DEMONSTRATION PURPOSES BECAUSE WE DON'T HAVE TIME TO MAKE OTHER OPTIONS WORK.
  const toiletGovernmentSite = "https://data.gov.au/data/api/3/action/datastore_search?resource_id=100da45f-6d1d-40ad-8c47-5a0481f1fbf9&q=";

  function retrieveToiletData() {
    const parsingString = `${toiletGovernmentSite}${location}`;
    console.log(parsingString);

    //Get the JSON objects
    const output = axios.get(parsingString);
    
    console.log(output);
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
                <IonButton onClick={ () => retrieveToiletData()} class="button">Allow access to location</IonButton>
                <p> or </p>
                <IonInput placeholder="Enter Location" class="text" type="text" onIonChange ={(e: any) => setLocation(e.target.value)}></IonInput>
              </div>
              <div className="add-toilet">
                <p className="text">Are we missing a toilet?</p>
                <IonButton onClick={ () => addToiletData()} class="button">Add toilet location</IonButton>
              </div>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
      
    </IonPage>
  );
};

export default Home;
