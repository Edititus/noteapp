import mongoose, {Document, model,Schema} from "mongoose"


export interface NoteInstance {
description: string;
completed : boolean;
userId: string
}
 export interface NoteDocument extends Document, NoteInstance {}
const noteSchema = new Schema({
  description:{
    type:String, 
    required: true
  }, 
  completed:{
    type:Boolean,
    default:false
  },
  userId: {
    type:String,
    required: false
  }
},
{
  timestamps:true
})

export const Note = mongoose.model<NoteInstance>("Note",noteSchema)

export default Note

