import express from 'express'; // Importing the Express framework
import routes from './routes.js'; // Importing the routes defined in routes.js

const app = express(); // Creating an instance of the Express application

app.use(express.json()); // Middleware to parse incoming JSON requests

app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded data (from forms)

app.use(routes); // Using the imported routes in the Express application

export default app; // Exporting the app instance for use in other files (like server.js)
