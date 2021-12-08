import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  return (
    <ul>
      { props.days.map(d => {
          return (
            <DayListItem
              key={d.id} 
              name={d.name} 
              spots={d.spots} 
              selected={d.name === props.day}
              setDay={props.setDay}  
            />
          );
        }) }
    </ul>
  );
}

