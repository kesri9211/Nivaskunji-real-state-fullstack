/*
this file is for the auth0 configuration
jwt will secure our mongodb database. Prevent unauthorized access to the database.
If user is valid then only create a instance in the database.
*/
import {auth} from 'express-oauth2-jwt-bearer';

const jwtCheck = auth({
    audience:"http://localhost:8000",
    issuerBaseURL:"https://dev-bzsqqegri8nq5tya.us.auth0.com", //same as domain id in main.jsx
    tokenSigningAlg:"RS256", // RS256 is the default method of token signin
})
export default jwtCheck;