import axios from "axios";
import { useEffect, useState } from "react";

export function useApplicationData() {
  // Initial state values necessary for the app rendering to not crash
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

    return axios
      .put(`http://localhost:8001/api/appointments/${id}`, appointment)
      .then(() => {
        // only if request is successful should we update the state
        setState((prev) => ({ ...prev, appointments }));
        updateSpots(id);
      });
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
      .then(() => {
        // only if request is successful should we update the state
        setState((prev) => ({ ...prev, appointments }));
        updateSpots(id);
      });
  };

  const updateSpots = function (id) {
    setState((prev) => {
      const days = [...prev.days];
      // get the day that contains the appointment id
      let day;
      for (const d of days) {
        if (d.appointments.includes(id)) {
          day = d;
          break;
        }
      }
      if (day) {
        // count the number of free appointment slots
        day.spots = day.appointments.filter(
          (id) => !prev.appointments[id].interview
        ).length;
      }
      return { ...prev, days };
    });
  };

  // Once the app loads, fetch data from api and save to state.
  // Only run one time per browser page load.
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
