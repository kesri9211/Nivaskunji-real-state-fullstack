// Importing the necessary modules
import express from 'express'; 
import dotenv from 'dotenv'; // Importing the dotenv module to load environment variables
import cookieParser from 'cookie-parser'; // Importing the cookie-parser module to parse cookies
import cors from 'cors'; // Importing the cors module to enable Cross-Origin Resource Sharing
import { userRoute } from './routes/userRoute.js';
import { residencyRoute } from './routes/residencyRoute.js';
// Load environment variables from .env file
dotenv.config();

// Creating an instance of express
const app = express();
// Setting the port number from environment variables or default to 3000
const PORT = process.env.PORT || 3000;
// Middleware to parse JSON bodies in requests
app.use(express.json());
// Middleware to parse cookies
app.use(cookieParser());
// Middleware to enable CORS (Cross-Origin Resource Sharing)
app.use(cors());

// Starting the server and listening on the specified port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Mounting the user routes on the /api/user path- act as endpoint
app.use('/api/user', userRoute);
app.use('/api/residency', residencyRoute);
