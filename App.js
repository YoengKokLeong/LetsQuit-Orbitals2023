import './App.css';
import {useState} from "react";
import StreakManager from "./components/StreakManager.js";
import InputName from "./components/InputName";
import InputAddiction from "./components/InputAddiction";
import AddCalendar from "./components/AddCalendar";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import AuthDetails from './components/AuthDetails';

function App() {
const [tasks,setTasks] = useState([]);

  return (
    <div className="App">
       <SignIn />
       <SignUp />
       <AuthDetails />
       <InputName numOfTasks ={tasks.length}/>
       <InputAddiction />
       <StreakManager tasks={tasks} setTasks = {setTasks} />
       <AddCalendar />
  </div>
  );
}

export default App;