import axios from "axios";
import { useEffect, useState } from "react";

export function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });
  const setDay = (day) => {
    setState({ ...state, day });
  };

  const bookInterview = function (id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    console.log(id, interview);

    return axios
      .put(`http://localhost:8001/api/appointments/${id}`, appointment)
      .then(() => setState({ ...state, appointments }));
  };

  const cancelInterview = function (id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios
      .delete(`http://localhost:8001/api/appointments/${id}`)
      .then(() => setState({ ...state, appointments }));
  };

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments"),
      axios.get("http://localhost:8001/api/interviewers"),
    ]).then((all) => {
      const [days, appointments, interviewers] = [
        all[0].data,
        all[1].data,
        all[2].data,
      ];
      setState((prev) => ({ ...prev, days, appointments, interviewers }));
    });
  }, []);

  return { state, setDay, bookInterview, cancelInterview };
}
