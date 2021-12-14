import React from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import { useVisualMode } from "hooks/useVisualMode";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM_DELETE = "CONFIRM_DELETE";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const save = function (name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING);
    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(() => transition(ERROR_SAVE, true));
  };

  const deleteHandler = function () {
    transition(DELETING, true);
    props
      .cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(() => transition(ERROR_DELETE, true));
  };

  const confirmDeleteHandler = function () {
    transition(CONFIRM_DELETE);
  };

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={confirmDeleteHandler}
          onEdit={() => transition(EDIT, true)}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={() => transition(EMPTY, true)}
          onSave={save}
        />
      )}
      {mode === SAVING && <Status message={"Saving..."} />}
      {mode === DELETING && <Status message={"Deleting..."} />}
      {mode === CONFIRM_DELETE && (
        <Confirm
          message={"Are you sure you would like to delete?"}
          onConfirm={deleteHandler}
          onCancel={back}
        />
      )}
      {mode === EDIT && (
        <Form
          interviewers={props.interviewers}
          student={props.interview.student}
          interviewer={
            props.interview.interviewer && props.interview.interviewer.id
          }
          onCancel={() => back()}
          onSave={save}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error message={"Could not book appointment."} onClose={() => back()} />
      )}
      {mode === ERROR_DELETE && (
        <Error
          message={"Could not cancel appointment."}
          onClose={() => back()}
        />
      )}
    </article>
  );
}
