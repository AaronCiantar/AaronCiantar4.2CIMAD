import {
   IonAlert,
   IonButton,
   IonCard,
   IonCardContent,
   IonCardTitle,
   IonImg,
   IonInput,
   IonContent, 
   IonHeader, 
   IonPage, 
   IonTitle, 
   IonToolbar 
  } from '@ionic/react';

  import {useState} from 'react';
  import { useHistory } from 'react-router-dom';


const AddWorkout: React.FC = () => {
  const [workoutName, setWorkoutName] = useState("");//state for workout name

  const [workouts,setWorkouts] = useState(() => {//store the workout list ,update the workout list
    const storedWorkout = localStorage.getItem("workouts");//get the saved workout data from localstorage under key word workouts
    if(storedWorkout){//checks if anythin was found 
      return JSON.parse(storedWorkout);//if yes it converts it into the array , .parse is used when loading
    }else{
      return [];//returns empty list if nothin was found
    }
  });

  const handleWorkoutNameChange = (event: any) => {//this function will run every time user types
    setWorkoutName(event.detail.value);//updates workout name
  };

  const [showAlert, setShowAlert] = useState(false);
  const history = useHistory();//navigation
  const handleAddWorkout = () => {//this function is used to add a workout

    if (workoutName.trim() === "") {
      setShowAlert(true);
      return;
    }

    const newWorkout = {//new object
      name:workoutName //object name(user typed workout name)
    };

    const storedWorkout = localStorage.getItem("workouts");
    let currentWorkouts = [];//empty aray 
    if(storedWorkout){
      currentWorkouts = JSON.parse(storedWorkout)//loads saved workouts in the array
    }
    const updatedWorkouts = [];//create new array for workout list 

    for (let i = 0; i < currentWorkouts.length; i++) {//loop throug each workout to copy them so that they wont get lost when a new workout is added 
      updatedWorkouts.push(currentWorkouts[i]);// copies the current workout in the array
    }

  updatedWorkouts.push(newWorkout);// adds the new workout

    localStorage.setItem("workouts" ,JSON.stringify(updatedWorkouts));//saves the array permenatnly , stringify convert array into text , .stringify is used when saving
    setWorkouts(updatedWorkouts);//updates ui
    setWorkoutName("");
    history.push("/addexercise");//goes to add exercise page 
  };
  

  return (
    <IonPage color=''>
      <IonHeader>
        <IonToolbar color={"medium"}>
          <IonTitle>Add Workout </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding ion-text-center">
         <IonCard color={"primary"}>
          <IonCardContent>
            <IonCardTitle>FitTracker</IonCardTitle>
          </IonCardContent>
        </IonCard>
         <div className="ion-margin-top ion-margin-bottom"></div>

         <IonCard color={"medium"}>
          <IonCardContent>
            <h2>Enter Workout Name</h2>
            <IonAlert
              isOpen={showAlert}
              onDidDismiss={() => setShowAlert(false)}
              header="Workout Name Missing"
              message="Please enter the workout name."
              buttons={["OK"]}/>
            <IonInput placeholder='Enter Workout Name:' value={workoutName} onIonInput={handleWorkoutNameChange}></IonInput>
            <IonButton expand='block' onClick={handleAddWorkout}>Add Workout  !</IonButton>
          </IonCardContent>
         </IonCard>

         <IonImg src='https://png.pngtree.com/png-vector/20250728/ourmid/pngtree-push-yourself-inspirational-gym-quote-for-workout-motivation-and-fitness-apparel-png-image_16911623.webp'></IonImg>
      </IonContent>
    </IonPage>
  );
};

export default AddWorkout;
