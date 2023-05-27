import express from "express";
import{
    // CreateNote, 
    // getNotes, 
    //updateNote, 
    //deleteNote
} from '../controller/notecontroller'
import{auth} from "../middlewares/auth"

const router = express.Router();
// router.post('/create',auth, CreateNote) 
// router.get("/get-Notes", auth, getNotes); 
//router.patch("/update/:_id", updateNote); 
// router.delete("/delete-Notes/:id", auth, deleteNote); 

export default router;
