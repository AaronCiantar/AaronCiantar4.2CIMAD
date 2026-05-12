import {
   IonAlert,
   IonBadge,
   IonButton,
   IonCard,
   IonCardContent,
   IonCardTitle,
   IonImg,
   IonLabel,
   IonIcon,
   IonContent, 
   IonHeader, 
   IonPage, 
   IonTitle, 
   IonToolbar,
   useIonViewWillEnter
  } from '@ionic/react';  

  import {addSharp} from 'ionicons/icons';
  import { useState } from 'react';



const loadWorkouts = () => {
  const storedWorkout = localStorage.getItem("workouts");

  if (!storedWorkout) {
    return [];
  }

  try {
    return JSON.parse(storedWorkout);
  } catch {
    localStorage.removeItem("workouts");
    return [];
  }
};
const Workout: React.FC = () => {
 
const [workouts, setWorkouts] = useState(loadWorkouts);
useIonViewWillEnter(() => {
  setWorkouts(loadWorkouts());
});

const [showDeleteAlert, setShowDeleteAlert] = useState(false);
const [workoutToDelete, setWorkoutToDelete] = useState(-1);

const renderWorkoutList = () => {//this function will build the workout ioncards
  const renderedWorkout = []; // this is the array where the ioncards will be placed in 

  //loop through every workout
  for(let i=0; i <workouts.length; i++){
    const workout = workouts[i]; //get current workout

    renderedWorkout.push( //add card in the array 
      <IonCard key={i} color={"medium"}>
        <IonCardContent>
          <h1>{workout.name}</h1>

          <IonButton routerLink = {`/view/${i}`}  routerDirection ='forward'>  {/*{`/view/${i}`} mean that the workout index is sent in the url  */}
                View
          </IonButton>

          <IonButton color={"danger"} onClick={() => {setWorkoutToDelete(i); setShowDeleteAlert(true);}}> {/*when clicked the funtion setWorkoutToDelete(i) will store the wrokout that will be deleted */}
            Delete
          </IonButton>
          </IonCardContent> 
          </IonCard>
    );
  }
  return renderedWorkout
};

  const handleDeleteWorkout = (indexToDelete: number) => {//this is the function that deletes a wrokout

  const finalArray =[];

  for (let i=0; i< workouts.length; i++){
      if( i !== indexToDelete){//if the current workout is not the one being deleted
        finalArray.push(workouts[i]);//add the workout to the array
      }
  }

  localStorage.setItem("workouts", JSON.stringify(finalArray));//saves 
  setWorkouts(finalArray);//updates the workout state for UI to refreash immediately 
};

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color={"medium"}>
          <IonTitle className='ion-text-center'>Workouts </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding ion-text-center" >
        <IonCard color={"primary"} >
          <IonCardContent>
            <IonCardTitle>FitTracker</IonCardTitle><br />
            <IonLabel>Workouts Added: {workouts.length}</IonLabel>
          </IonCardContent>
        </IonCard>
        <div className="ion-margin-top ion-margin-bottom"></div>{/*add spacing */}

        {workouts.length === 0 ? ( //are there 0 workouts?
          <> {/*starts react fragment withoud adding extra HTML elemetns*/}
            <IonBadge color={"primary"}> No Workouts</IonBadge> <br />

            <h5>
              Currently you have no workouts available !
              <br /><br />
              Click the button below to add a workout !
            </h5>

            <IonButton routerLink='/addworkout' routerDirection='forward'><IonIcon icon={addSharp}></IonIcon></IonButton> <br /><br />
        

            <IonImg src='https://media.istockphoto.com/id/2158236453/photo/man-using-smartphone-in-gym.jpg?s=612x612&w=0&k=20&c=VCW9Yy7ErHLEkXv7ddzeTdTYQSobFyeF9CPC0HnZgOw='></IonImg> 
          </>
        ) :( //when workout exists 
          <>
          {renderWorkoutList()} {/*this function is used to call the workout cards to be displayed  */}
          <IonButton routerLink='/addworkout' routerDirection='forward'>
              <IonIcon icon={addSharp}></IonIcon>
            </IonButton>
          </>
        )}

        <IonAlert
            isOpen={showDeleteAlert}
            onDidDismiss={() => setShowDeleteAlert(false)}
            header="Delete Workout"
            message="Are you sure you want to delete this workout?"
            buttons={[
              {
                text: "Cancel",
                role: "cancel"
              },
              {
                text: "Delete",
                handler: () => {
                  handleDeleteWorkout(workoutToDelete);
                }
              }
            ]}
          />
      </IonContent>
    </IonPage>
  );
};

export default Workout;
