export function getAppointmentsForDay(state, day) {
  const output = [];
  let dayTarget;
  for (const dayObj of state.days) {
    if (dayObj.name === day) {
      dayTarget = dayObj;
    }
  }

  if (dayTarget) {
    for (const appointment of dayTarget.appointments) {
      output.push(state.appointments[appointment]);
    }
  }
  return output;
}

export function getInterview(state, interview) {
  let output = null;
  if (interview) {
    return {
      ...interview,
      interviewer: state.interviewers[interview.interviewer],
    };
  }
  return output;
}