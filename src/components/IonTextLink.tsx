import React from 'react'
import { IonButton } from '@ionic/react'

const IonTextLink: React.FC = () => {
  const [ text, setText ] = React.useState("Primary Button") 
  return(
    <IonButton 
      color="primary" 
      onClick={ () => setText("Clicked") }
    >
      { text }
    </IonButton>
  )
}

export default IonTextLink;