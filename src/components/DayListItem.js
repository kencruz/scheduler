import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss";

export default function DayListItem(props) {
  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0,
  });
  const formatSpots = (num) => {
    const count = num === 0 ? "no" : num; // say no instead of 0
    const pluralSuffix = num !== 1 ? "s" : ""; // english grammar plural rules
    return `${count} spot${pluralSuffix} remaining`;
  };
  return (
    <li
      className={dayClass}
      onClick={() => {
        props.setDay(props.name);
      }}
    >
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}
