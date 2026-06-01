import app from './app.js'; // Importing the Express application instance from app.js
import './database/index.js'; // Importing the database configuration and initialization, which will set up the connection to the database when the server starts

app.listen(3001, (error) => {
  if (error) {
    console.error(error);
    process.exit(1);
  }

  console.log('Application is running at port 3001');
}); // Starting the server and listening on port 3001, with a callback to log a message when the server is running
