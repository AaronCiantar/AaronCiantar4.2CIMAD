import {
   IonAlert,
   IonButton,
   IonCard,
   IonCardContent,
   IonCardTitle,
   IonCheckbox,
   IonInput,
   IonContent, 
   IonHeader, 
   IonPage, 
   IonTitle, 
   IonToolbar,
   useIonViewWillEnter
  } from '@ionic/react';
  import { useState } from 'react';
  import {useParams} from  'react-router-dom';


const WorkoutDetails: React.FC = () => {

  const { id }  = useParams<{ id: string}>();//gets id from url

  const [workouts , setWorkouts] = useState(() => {//store the workout list ,update the workout list
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
});

  const [isEditing,setIsEditing] = useState(false);
  //storing of user input
  const [newExerciseName, setNewExerciseName] = useState("");
  const [newExerciseReps, setNewExerciseReps] = useState("");
  const [newExerciseSets, setNewExerciseSets] = useState("");

const workout = workouts[parseInt(id)]; //get the workout selected from url after parsing it

const handleToggleExericseCompleted = (exerciseIndex: number) =>{ //this is used when checkbox is ticked
  const updatedWorkouts = [];//new aray

for (let i = 0; i < workouts.length; i++) {
  updatedWorkouts.push(workouts[i]);//copy all workout into new array
}
  const workoutIndex = parseInt(id);//get the workout selected from url after parsing it 

  updatedWorkouts[workoutIndex].exercises[exerciseIndex].completed = !updatedWorkouts[workoutIndex].exercises[exerciseIndex].completed; //*if it was false it comes true and vice versa
  
  localStorage.setItem("workouts", JSON.stringify(updatedWorkouts));//saves
  setWorkouts(updatedWorkouts);//update ui
};



const handleAddNewExercise = () => {//this function is used to add a new exercise
  if (newExerciseName.trim() === "" || newExerciseReps.trim() === "" ||newExerciseSets.trim() === "") {
  setShowAlert(true);
  return;
}
  if (
  parseInt(newExerciseReps) <= 0 ||parseInt(newExerciseSets) <= 0) {
  setShowAlert(true);
  return;
}
  const updatedWorkouts = [];//new array

for (let i = 0; i < workouts.length; i++) {//loop through each wokrout
  updatedWorkouts.push(workouts[i]);//copy the workout into the array
}
  const workoutIndex = parseInt(id);//id is parsed into a number

  const newExercise = {
    name: newExerciseName,
    reps: newExerciseReps,
    sets: newExerciseSets,
    completed: false
  };//creates the new exercise object

  updatedWorkouts[workoutIndex].exercises.push(newExercise);//adds the exercise in the selected workout 

  localStorage.setItem("workouts" , JSON.stringify(updatedWorkouts));//saves
  setWorkouts(updatedWorkouts);//updates ui

  setNewExerciseName("");
  setNewExerciseReps("");
  setNewExerciseSets("");
  //to clear the ioninput 
};

const [showAlert, setShowAlert] = useState(false);
const [exerciseToDelete, setExerciseToDelete] = useState(-1);//stores which exercise should be deleted
const [showDeleteAlert, setShowDeleteAlert] = useState(false);
const handleDeleteExercise = (exerciseIndex: number) => {//this functuon is used to delete an exercise
  const updatedWorkouts = [];//new array

for (let i = 0; i < workouts.length; i++) {//loop through each wokrout
  updatedWorkouts.push(workouts[i]);//copy the workout into the array
}
  const workoutIndex = parseInt(id);//id is parsed into a number

  const finalExercises =[];//new array
  for(let i= 0; i<updatedWorkouts[workoutIndex].exercises.length;i++){
    if(i!== exerciseIndex){
      finalExercises.push(updatedWorkouts[workoutIndex].exercises[i]);
    }//loops through all the exercises to copy them excpet the one being deleted
  }
  updatedWorkouts[workoutIndex].exercises = finalExercises;//replace the new list with the old oen 

  localStorage.setItem("workouts" ,JSON.stringify(updatedWorkouts));//saves
  setWorkouts(updatedWorkouts);//updates Ui
};

const handleEditExerciseField = (//this function is used to edit one field of an exercise
  exerciseIndex: number,//which exercise is being edited?
  field: string,//waht property of the exercise is being vhanged?
  value: any //what new value should replace the old one?
) => {
  const updatedWorkouts = [];

for (let i = 0; i < workouts.length; i++) {//loop through each wokrout
  updatedWorkouts.push(workouts[i]);//copy the workout into the array
}
  const workoutIndex =parseInt(id);//id is parsed into a number

  updatedWorkouts[workoutIndex].exercises[exerciseIndex] [field] = value; //does the update ex: exercsieIndex = 0 ,field = reps,value= 15 = change reps of exercise 0 to 15

    localStorage.setItem("workouts", JSON.stringify(updatedWorkouts));//saves
    setWorkouts(updatedWorkouts);//updates ui
};

const renderExerciseList = () => {//builds the ionexercise cards
  const renderedExercises = [];//new array



  if(workout && workout.exercises){//make sure exercise exists and it has an exericse to display
    for (let i = 0; i < workout.exercises.length; i++){//loop trough each exercise
      const exercise = workout.exercises[i]; // get curretn exercise

      renderedExercises.push(
        <IonCard key={i} color={"medium"}>
          <IonCardContent>
            {isEditing ? (//if in edit mdoe show...
              <>
                <h2>Exercise Name</h2>
                <IonInput value={exercise.name} onIonInput={(event: any) => handleEditExerciseField(i,"name" , event.detail.value)}>
                </IonInput>

                <h2>Exercise Reps</h2>
                <IonInput value={exercise.reps} onIonInput={(event: any) => handleEditExerciseField(i,"reps" , event.detail.value)}>
                </IonInput>

                <h2>Exercise Sets</h2>
                <IonInput value={exercise.sets} onIonInput={(event: any) => handleEditExerciseField(i,"sets" , event.detail.value)}>
                </IonInput>

                <IonButton color={'danger'} onClick={() => {setExerciseToDelete(i);setShowDeleteAlert(true);}}>
                  Delete exercise</IonButton>
                </>
            ): (//if not editing show exercise details
              <>
            <h2>{exercise.name}</h2>
            <p>Sets: {exercise.sets}</p>
            <p>Reps: {exercise.reps}</p>
            <IonCheckbox checked = {exercise.completed} onIonChange={() => handleToggleExericseCompleted(i)}></IonCheckbox>
            </>
            )}
           </IonCardContent>
        </IonCard>
      );
    }
  }
  return renderedExercises;
};

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color={"medium"}>
          <IonTitle className='ion-text-center'>View Workout</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding ion-text-center">
        <IonCard color={"primary"} >
          <IonCardContent>
            <IonCardTitle>{workout ? workout.name : "Workout Name"}</IonCardTitle><br />
          </IonCardContent>
        </IonCard>
        <div className="ion-margin-top ion-margin-bottom"></div>

        {renderExerciseList()} {/*displays all exercse card*/}

         <IonButton expand="block" onClick= {() => setIsEditing(!isEditing)}>{/*swhitches edit mode on and off */}
          Edit Workout
        </IonButton>

        {isEditing && ( //only shwo when in edit mode
          <IonCard color={"medium"}>
            <IonCardContent>

              <IonAlert
                  isOpen={showAlert}
                  onDidDismiss={() => setShowAlert(false)}
                  header="Missing Exercise Details"
                  message="Please enter all details, all sets and reps must be greater than 0."
                  buttons={["OK"]}
                />

              <h2>Exercise Name</h2>
              <IonInput placeholder='Enter Exercise Name' value={newExerciseName} onIonInput={(event:any) => setNewExerciseName(event.detail.value)}>
              </IonInput>

              <h2>Exercise Reps</h2>
              <IonInput placeholder='Enter Exercise Reps' value={newExerciseReps} onIonInput={(event:any) => setNewExerciseReps(event.detail.value)}>
              </IonInput>

              <h2>Exercise Sets</h2>
              <IonInput placeholder='Enter Exercise Sets' value={newExerciseSets} onIonInput={(event:any) => setNewExerciseSets(event.detail.value)}>
              </IonInput>

              <IonButton expand='block' onClick={handleAddNewExercise}>
                Add Exercise!
              </IonButton>
            </IonCardContent>
          </IonCard>
        )}
       <IonAlert
          isOpen={showDeleteAlert}
          onDidDismiss={() => setShowDeleteAlert(false)}
          header="Delete Exercise"
          message="Are you sure you want to delete this exercise?"
          buttons={[
            {
              text: "Cancel",
              role: "cancel"
            },
            {
              text: "Delete",
              handler: () => {
                handleDeleteExercise(exerciseToDelete);
              }
            }
          ]}
        />
      </IonContent>
    </IonPage>
  );
};

export default WorkoutDetails;
