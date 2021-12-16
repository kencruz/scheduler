# Interview Scheduler

Interview Scheduler is a simple appointment booking system.

Built with React.

## Final Product

!["Screenshot of the main view"](https://github.com/kencruz/scheduler/blob/master/docs/main-view.png)

!["Screenshot of editing an appointment"](https://github.com/kencruz/scheduler/blob/master/docs/appointment-form.png)

!["Screenshot of confirming appointment cancellation"](https://github.com/kencruz/scheduler/blob/master/docs/confirm-delete.png)

## Getting Started

1. Clone this repository and enter the directory: `git clone https://github.com/kencruz/scheduler.git && cd scheduler`
2. Install dependencies using the `npm install` command.
3. Setup the backend server with the [scheduler-api repo](https://github.com/lighthouse-labs/scheduler-api). Follow its README to run the backend server.
3. Start the web server using the `npm start` command. The app will be served at <http://localhost:8000/>.
4. Go to <http://localhost:8000/> in your browser.

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

## Running Cypress Testbed
Make sure you have cypress installed globally
```sh
npm install -g cypress
```
Running cypress
```sh
npm run cypress
```

## Dependencies

- react v16.9.0
- classnames
- axios
- Node v12.22.7
