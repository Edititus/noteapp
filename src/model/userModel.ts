import mongoose, {Document, model,Schema} from "mongoose"



export interface UserAttributes{
    email: string
    firstName: string
    password:string
    
}


export interface UserDocument extends Document, UserAttributes {}

const userSchema = new Schema<UserDocument>({
  // _id: {
  //   type: String,
  //   default: uuidv4,
  //   primaryKey:true,
  // },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
},
  {
    timestamps: true,
  }

  
);

export const User = mongoose.model<UserDocument>("User", userSchema);

