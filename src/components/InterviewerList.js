import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "components/InterviewerListItem";
import PropTypes from "prop-types";

export default function InterviewerList(props) {
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {props.interviewers.map((i) => (
          <InterviewerListItem
            key={i.id}
            setInterviewer={() => props.onChange(i.id)}
            name={i.name}
            avatar={i.avatar}
            selected={props.value === i.id}
          />
        ))}
      </ul>
    </section>
  );
}

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired,
};
