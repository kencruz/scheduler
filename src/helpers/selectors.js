export function getAppointmentsForDay(state, day) {
  const appointments = [];
  let dayTarget;
  for (const d of state.days) {
    if (d.name === day) {
      dayTarget = d;
      break;
    }
  }

  if (dayTarget) {
    for (const id of dayTarget.appointments) {
      appointments.push(state.appointments[id]);
    }
  }
  return appointments;
}

export function getInterview(state, interview) {
  if (interview) {
    return {
      ...interview,
      interviewer: state.interviewers[interview.interviewer],
    };
  }
  return null;
}

export function getInterviewersForDay(state, day) {
  const interviewers = [];
  let dayTarget;

  for (const d of state.days) {
    if (d.name === day) {
      dayTarget = d;
      break;
    }
  }

  if (dayTarget) {
    for (const id of dayTarget.interviewers) {
      interviewers.push(state.interviewers[id]);
    }
  }
  return interviewers;
}
