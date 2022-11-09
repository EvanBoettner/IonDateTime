import {   
    IonPage,
    IonText,
    IonCard,
    IonCardContent,
    IonItem,
    IonList,
    IonContent,
    IonLabel
} from '@ionic/react';
import React from 'react';


 const Cubicles: React.FC = () => {

  const handleClick = () => {
    console.log("click");
  }

    return (
    <IonPage>
      <IonContent>
      <IonCard>
        <IonCardContent>
            <IonLabel>Please Select A Cubicle</IonLabel>
            <IonList>
              <IonItem button onClick={handleClick} lines='full'>
              {Array(20).fill(0).map((_, i) => (
                <IonItem key={i}>
                  <IonText>Cubicle {i}</IonText>
                </IonItem>
              ))}
              </IonItem>
            </IonList>
          </IonCardContent>
      </IonCard>
      </IonContent>
    </IonPage>
    )
  };

  export default Cubicles;