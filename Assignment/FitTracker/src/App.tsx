import { Redirect, Route } from 'react-router-dom';
import { 
  IonApp, 
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
  IonRouterOutlet, 
  setupIonicReact 

} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Workout from './pages/Workout';
import AddWorkout from './pages/AddWorkout'
import AddExercise from './pages/AddExercise';
import WorkoutDetails from './pages/WorkoutDetails';

import {accessibilitySharp } from 'ionicons/icons';
 import {addSharp} from 'ionicons/icons';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';


setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/workout">
          <Workout />
        </Route>

        <Route exact path="/addworkout">
          <AddWorkout />
        </Route>

        <Route exact path="/addexercise">
          <AddExercise />
        </Route>

        <Route exact path="/view/:id">
          <WorkoutDetails />
        </Route>

        <Route exact path="/">
          <Redirect to="/workout" />
        </Route>

      </IonRouterOutlet>

      <IonTabBar slot='bottom'>
        <IonTabButton tab='workout' href='/workout'>
        <IonIcon icon={accessibilitySharp}/> 
        <IonLabel>Workouts</IonLabel>
        </IonTabButton>

         <IonTabButton tab='addworkout' href='/addworkout'>
        <IonIcon icon={addSharp}/> 
        <IonLabel>Add</IonLabel>
        </IonTabButton>
      </IonTabBar>

      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
