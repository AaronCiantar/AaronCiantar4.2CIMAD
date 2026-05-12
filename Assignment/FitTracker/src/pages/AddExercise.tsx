import {
   IonAlert,
   IonButton,
   IonCard,
   IonCardContent,
   IonCardTitle,
   IonInput,
   IonContent, 
   IonHeader, 
   IonPage, 
   IonTitle, 
   IonToolbar,
   useIonViewWillEnter
  } from '@ionic/react';


 import {useState} from 'react';
 import { useHistory } from 'react-router-dom';

const AddExercise: React.FC = () => { 
  //storing of the user input
  const [exerciseName, setExerciseName] = useState("");
  const [exerciseReps, setExerciseReps] = useState("");
  const [exerciseSets, setExerciseSets] = useState("");

    const [workouts,setWorkouts] = useState(() => {//store the workout list ,update the workout list
    const storedWorkout = localStorage.getItem("workouts");//get the saved workout data from localstorage under key word workouts
    if(storedWorkout){//checks if anythign is found
      return JSON.parse(storedWorkout);//if yes it converts it into the array
    }else{
      return [];//return empty array if no
    }
  }); 

  useIonViewWillEnter(() => {
  const storedWorkout = localStorage.getItem("workouts");

  if (storedWorkout) {
    setWorkouts(JSON.parse(storedWorkout));
  } else {
    setWorkouts([]);
  }

  setExerciseName("");
  setExerciseReps("");
  setExerciseSets("");
});

  
  const handleExerciseNameChange = (event : any) => {//user types, any accepts whatever comes in
    setExerciseName(event.detail.value)//update name according to what user types
  };

  const handleExerciseRepsChange = (event :any) => {//user types, any accepts whatever comes in
    setExerciseReps(event.detail.value)//update reps according to what user types
  };

  const handleExersiceSetChange = (event : any) => {//user types, any accepts whatever comes in
    setExerciseSets(event.detail.value)//update sets according to what user types
  };

  const [showAlert, setShowAlert] = useState(false);
  const history = useHistory();
  const handleAddExercise = () => {//this function is used to add exercise 

    if (exerciseName.trim() === "" ||exerciseReps.trim() === "" ||exerciseSets.trim() === "") {
      setShowAlert(true);
      return;
    }
    if (parseInt(exerciseReps) <= 0 || parseInt(exerciseSets) <= 0) {
      setShowAlert(true);
      return;
}


    const storedWorkout = localStorage.getItem("workouts");//gets saved wrokouts

    let currentWorkouts = [];//empty array
    if (storedWorkout) {
      currentWorkouts = JSON.parse(storedWorkout);//load into current workout if true
    }
    if(currentWorkouts.length > 0){//if theres minimum 1 workout
      const lastWorkoutIndex = currentWorkouts.length -1; //get the postiion of the workout in the aray 

      const newExercise = {
        name: exerciseName,
        reps: exerciseReps,
        sets: exerciseSets,
        completed: false 
      };//exercise object 

      if (!currentWorkouts[lastWorkoutIndex].exercises){
        currentWorkouts[lastWorkoutIndex].exercises =[];//checks for an ecercise array , if there isnt it creates one 
      }

      currentWorkouts[lastWorkoutIndex].exercises.push(newExercise);//adds the new exercise into the workout's exercises array

      localStorage.setItem("workouts"  ,JSON.stringify(currentWorkouts));//saves permanently
      setWorkouts(currentWorkouts);
      history.push("/workout");
    }
  };
  return (
    <IonPage color=''>
      <IonHeader>
        <IonToolbar color={"medium"}>
          <IonTitle>Add Exercise </IonTitle>
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
            <h1> {workouts.length > 0 ? workouts[workouts.length -1].name : "Workout Name"}</h1> <br />{/*Displays latest workout name, if there are no workout, display workout name*/}

            <IonAlert
                isOpen={showAlert}
                onDidDismiss={() => setShowAlert(false)}
                header="Missing Exercise Details"
                message="Please enter all details, all sets and reps must be greater than 0."
                buttons={["OK"]}
              />

            <h2>Exercise Name</h2>
            <IonInput placeholder='Enter Exercise Name:' value={exerciseName} onIonInput={handleExerciseNameChange}></IonInput>

            <h2>Exercise Reps</h2>
            <IonInput placeholder='Enter Exercise Reps:' value={exerciseReps} onIonInput={handleExerciseRepsChange}></IonInput>

            <h2>Exercise Sets</h2>
            <IonInput placeholder='Enter Exercise Sets:' value={exerciseSets} onIonInput={handleExersiceSetChange}></IonInput>
            <IonButton expand='block'   onClick={handleAddExercise}>Add Exercise !</IonButton>
          </IonCardContent>
         </IonCard>

      </IonContent>
    </IonPage>
  );
};

export default AddExercise;
