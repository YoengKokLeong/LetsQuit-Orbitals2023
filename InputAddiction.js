import {useState} from "react";

export default function InputAddiction (){
    const [addiction, setAddiction] = useState("an addiction!");

const handleAddictionChangeClick = () => {
  const newAddiction = prompt("What addiction should we overcome?");
  if (newAddiction.length === 0) {
    setAddiction("No addiction?");
  } else {
    setAddiction(newAddiction);
  }
};

return (
    <header>
        <p> Lets defeat {addiction} </p>
        <button onClick={handleAddictionChangeClick}> Set Addiction </button>
    </header>
);
}