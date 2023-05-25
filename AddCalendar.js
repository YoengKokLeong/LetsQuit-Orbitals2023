import Calendar from 'react-calendar';
import {useState} from "react";

export default function AddCalendar () {

    const [date,onChange] = useState(new Date());
    /*const onChange = (date) => {
        setDate(date);
    } */
    return (
        <div>
            <Calendar onChange={onChange} value ={date} />
        </div>
    );
};
