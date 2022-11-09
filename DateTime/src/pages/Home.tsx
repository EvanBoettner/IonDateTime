import React, { useState } from 'react';
import {
  IonDatetime,
  // rest of imports
  IonApp,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonInput,
  IonAccordionGroup,
  IonAccordion,
  IonLabel,
  IonNote,
  useIonPicker,
  IonPage,
  useIonRouter,
} from '@ionic/react';
import { format, parseISO } from 'date-fns';
import './Home.css';

  const Home: React.FC = () => {
  const [startDatetime, setStartDatetime] = useState<string>();
  const [endDatetime, setEndDatetime] = useState<string>();
  
  const formatDate = (value: any) => {
    return format(parseISO(value), 'MMM dd, yyyy hh:mm aa');
  };

  const isWeekday = (dateString: string) => {
    const date = new Date(dateString);
    const utcDay = date.getUTCDay();
    
    /**
     * Date will be enabled if it is not
     * Sunday or Saturday
     */
    return utcDay !== 0 && utcDay !== 6;
  }

  interface PickerButton {
    text?: string;
    role?: string;
    cssClass?: string | string[];
    handler?: (value: any) => boolean | void;
  }

  interface PickerColumn {
    name: string;
    align?: string;
    selectedIndex?: number;
    prevSelected?: number;
    prefix?: string;
    suffix?: string;
    options: PickerColumnOption[];
    cssClass?: string | string[];
    columnWidth?: string;
    prefixWidth?: string;
    suffixWidth?: string;
    optionsWidth?: string;
  }

  interface PickerColumnOption {
    text?: string;
    value?: any;
    disabled?: boolean;
    duration?: number;
    transform?: string;
    selected?: boolean;
  }

  interface PickerOptions {
    columns: PickerColumn[];
    buttons?: PickerButton[];
    cssClass?: string | string[];
    showBackdrop?: boolean;
    backdropDismiss?: boolean;
    animated?: boolean;
  
    mode?: "ios | md";
    keyboardClose?: boolean;
    id?: string;
    htmlAttributes?: { [key: string]: any };
  
    enterAnimation?: ((baseEl: any, opts?: any) => Animation);
    leaveAnimation?: ((baseEl: any, opts?: any) => Animation);
  }
  
  const [present] = useIonPicker();

  const openLocations = async () => {
    present({
      columns: [
        {
          name: 'Locations',
          options: [
            {
              text: 'Research Park',
              value: 'research park',
            },
            {
              text: 'Waukesha',
              value: 'waukesha',
            },
          ],
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Confirm',
          handler: (value: any) => {
            window.alert(`You selected: ${value.Locations.value}`);
          },
        },
      ],
    });
  };



  return (
    <IonApp>
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonTitle>Calendar</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen={true} class="component-content">
        <IonList inset={true}>
          <IonItem button onClick={openLocations} lines="full">
            <IonLabel>Locations</IonLabel>
          </IonItem>
        </IonList>
        <IonList inset={true}>
          <IonItem button routerLink='./Cubicles.tsx' lines="full">
            <IonLabel>Please Select a Cubicle</IonLabel>
          </IonItem>
        </IonList>
        

        <IonList inset={true}>
          <IonAccordionGroup value="start">
            <IonAccordion value="start">
              <IonItem slot="header">
                <IonLabel>Starts</IonLabel>
                <IonNote slot="end" id="start-date">{startDatetime}</IonNote>
              </IonItem>
              <IonDatetime
                isDateEnabled={isWeekday}
                slot="content"
                presentation="date-time"
                id="datetime-start"
                onIonChange={e => setStartDatetime(formatDate(e.detail.value!))}
              ></IonDatetime>
            </IonAccordion>
            <IonAccordion value="end">
              <IonItem slot="header">
                <IonLabel>Ends</IonLabel>
                <IonNote slot="end" id="end-date">{endDatetime}</IonNote>
              </IonItem>
              <IonDatetime
                isDateEnabled={isWeekday}
                slot="content"
                presentation="date-time"
                id="datetime-end"
                onIonChange={e => setEndDatetime(formatDate(e.detail.value!))}
              ></IonDatetime>
            </IonAccordion>
          </IonAccordionGroup>
        </IonList>
      </IonContent>
    </IonApp>
  )
}

export default Home 

