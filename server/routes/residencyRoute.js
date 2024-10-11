import express from 'express';
const router = express.Router();
import { createResidency ,getAllResidencies,  getResidency } from '../controllers/resdCntrl.js'; 
import jwtCheck from '../config/auth0Config.js';


/*when some one hits the /create endpoint, the createResidency function will be called
this endpoint is used to create a new residency and at the time of testing api using postman
*/
router.post("/create",jwtCheck,createResidency);
//when some one hits the /all endpoint, the getAllResidencies function will be called defined in resdCntrl.js
router.get("/all",getAllResidencies);
//similarly for getResidency
router.get("/:id", getResidency);

export {router as residencyRoute};