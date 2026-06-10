import express from 'express'; // Importing the Express framework
import routes from './routes.js'; // Importing the routes defined in routes.js
import fileRouteConfig from './config/fileRoutes.cjs' // Importing the file route configuration for serving static files

const app = express(); // Creating an instance of the Express application

app.use(express.json()); // Middleware to parse incoming JSON requests

app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded data (from forms)
app.use('/product-file', fileRouteConfig) // Middleware to serve static files from the uploads directory when accessed via /product-file
app.use('/category-file', fileRouteConfig) // Middleware to serve static files from the uploads directory when accessed via /product-file

app.use(routes); // Using the imported routes in the Express application

export default app; // Exporting the app instance for use in other files (like server.js)
