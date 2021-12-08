import React from "react";
import  "components/InterviewerListItem.scss"
import classNames from "classnames";

export default function InterviewerListItem(props) {
  const InterviewerListItemClass = classNames("interviewers__item", {"interviewers__item--selected": props.selected})
  return (
    <li className={InterviewerListItemClass} onClick={() => props.setInterviewer(props.id)}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt="Sylvia Palmer"
      />
      { props.selected && props.name }
    </li>
  )
}
