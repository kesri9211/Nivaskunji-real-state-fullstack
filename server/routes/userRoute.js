import express from 'express';
import { createUser,bookVisit, getAllBookings, cancelBooking, toFav, getAllFav } from '../controllers/userControl.js';
import jwtCheck from '../config/auth0Config.js';

const router = express.Router();

//when some one hits the /register endpoint, the createUser function will be called
//jwtCheck is a middleware that checks if the user is authenticated, when user will pass middleware then createUser function will be called
router.post('/register', jwtCheck,createUser);
//similarly
router.post('/bookVisit/:id',jwtCheck,bookVisit);
router.post('/allBookings',jwtCheck,getAllBookings);
router.post('/removeBooking/:id',jwtCheck,cancelBooking);
router.post('/toFav/:rid',jwtCheck,toFav); //add or remove residency to fav list
router.post('/getFav',jwtCheck,getAllFav);

export {router as userRoute};