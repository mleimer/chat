# Address book app

This is a very simple Chat App using STOMP.js and REST to communicate with the server.

## TODOs
- Field validation (required, length & entered characters)
- Show errors if connection cannot be built up

## Run the application

### Pre-Requisites
Install Node.js and npm according to the official documentation [https://docs.npmjs.com/downloading-and-installing-node-js-and-npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

### Run a production optimized build locally

Please use docker commands as explained in parent README.md

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run lint`

Executes static code analysis on the source code

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.


## Dependencies

### Core
- React - Core Framework
- React-Scripts - using Webpack, Babel, Jest, ESLint and alike under the hood - see [https://www.npmjs.com/package/react-scripts](https://www.npmjs.com/package/react-scripts)
- Cross-Fetch - for making HTTP-Requests to the REST-API - see (https://www.npmjs.com/package/cross-fetch)
- STOMP.js - Library providing a STOMP client - see (https://www.npmjs.com/package/stompjs)
- SockJS - Library providing WebSocket-like object - see (https://www.npmjs.com/package/sockjs-client)
- Material-UI - UI Framework - see (https://www.npmjs.com/package/sockjs-client)
- Moment - Date handling - see (https://www.npmjs.com/package/moment)
- React-Moment - The Moment component using Moment to visualize dates in UI - see (https://www.npmjs.com/package/react-moment)

### Utilities
- Serve - to statically serve your build folder

### Testing
- ESLint - for static code analysis and common code style among development team
- Jest - Testing Framework for React apps
