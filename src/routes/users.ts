import express, { NextFunction, Request, Response } from 'express';
const router = express.Router();
import {Register,Login, 
    // getUserAndNote, 
    Logout} from "../controller/usersController"

/* GET users listing. */
router.post('/register', Register) 
router.post('/login', Login) 
 router.post('/logout', Logout) 
// router.get('/get-user', getUserAndNote) 

export default router
