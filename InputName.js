import {useState} from "react";

export default function InputName({ numOfTasks }) {
    const [name, setName] = useState("Anne");

const handleNameChangeClick = () => {
  const newName = prompt("What's your name?");
  if (newName.length === 0) {
    setName("stranger");
  } else {
    setName(newName);
  }
};

return (
    <header>
        <h1> LetsQuit </h1>
        <h2> Welcome back, {name} </h2>
        <button onClick={handleNameChangeClick}> Change Name </button>
        {numOfTasks > 0 ? (
          <p>
            You are on FIRE!  <strong> {numOfTasks} day streak</strong> so far!
          </p>
        ) : (
          <p> An awesome streak is about to begin.....</p>
        )}
    </header>
);
}