import { Note} from "../model/noteModel";
import { Response, Request } from "express";
import { User, UserDocument} from "../model/userModel";
import { v4 as uuidv4 } from "uuid";
import { registerUserSchema, options, loginUserSchema } from "../utils/utils";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

const jwtsecret = process.env.JWT_SECRET as string;


/*=============================user api===================== */
// export const Register = async (req: Request, res: Response) => {
//   try {
//     const { email, firstName, password, confirm_password } = req.body;
//     // console.log(req.body)
//     const iduuid = uuidv4();
   
//     const validationResult = registerUserSchema.validate(req.body, options);

//     if (validationResult.error) {
//       return res
//         .status(400)
//         .json({ Error: validationResult.error.details[0].message });
//     }

//     //hash password
//     const passwordHash = await bcrypt.hash(password, 8);

//     //create user
//     // findOne is used to check if the user already exist
//     const user = await User.findOne({
//       email: email,
//     });
//     if (!user) {
//       let newUser = await User.create({
//         _id: iduuid,
//         email,
//         firstName,
//         password: passwordHash,
      
//       });

//         const userSave = await new User(newUser).save()
//          console.log(userSave)

//       //Generate token for user
//       // const user = (await User.findOne({
//       //   where: { email: email },
//       // })) as unknown as { [key: string]: string };
//       // as unknown as is used in place of interface to declare the object type

//       const { _id } = newUser;
//       // on creation of newUser, we need to give the user a token
//       console.log("token")
//       const token = jwt.sign({_id}, jwtsecret, { expiresIn: "30mins" });
     

//       res.cookie("token", token, { httpOnly: true, maxAge: 30 * 60 * 1000 });

//        res.status(201).json({
//         msg: "user created successfully",
//         newUser,
//         token,
//       });
   
//     }
//     else{
//       //409 == duplicates
//       res.status(409).json({
//         error: "email already taken"
//       })
//     }

    
//   }catch (err) {
//     console.log(err);
//     res.status(500).json({ Error: "Internal server error" });
//   }
// };

// export const Login = async (req: Request, res: Response) => {
//   try {
//     const { email, password } = req.body;
//     // console.log(req.body);

//     const validationResult = loginUserSchema.validate(req.body, options);

//     if (validationResult.error) {
//       return res
//         .status(400)
//         .json({ Error: validationResult.error.details[0].message });
//     }
//     const user: UserDocument |any = await User.findOne({email: email })
//     const {_id} = user


//     const token = jwt.sign({_id }, jwtsecret, { expiresIn: "30d" });

//     res.cookie("token", token, {
//       httpOnly: true,
//       maxAge: 30 * 24 * 60 * 60 * 1000,
//     });
 
//     const validUser = await bcrypt.compare(password, user.password);


//     if (validUser) {
//       return res.status(201).json({
//         msg: "You have successfully logged in",
//         user,
//         token,
//       });
//     }
//         return res.status(401).json({ error: "Invalid email or password" });

//     //return res.redirect("/dashboard")
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ Error: "Internal server error" });
//   }
// };

// export const getUserAndNote = async (req: Request, res: Response) => {
//   try {
//     const getAllUsers = await User.find().populate('notes');
//     return res.status(200).json({
//       msg: 'You have successfully retrieved all data',
//       count: getAllUsers.length,
//       users: getAllUsers,
//     });
//   } catch (err) {
//     console.log(err);
//   }
// };


// export const Logout = async (req: Request, res: Response) => {
//   res.clearCookie('token');
//   // res.redirect('/');
// }

/*======================EJS API============================= */
export const Register = async (req: Request, res: Response) => {
  try {
    const { email, firstName, password, confirm_password } = req.body;
   
    const iduuid = uuidv4();
   
    const validationResult = registerUserSchema.validate(req.body, options);

    if (validationResult.error) {
    
      return res.render("Register", {error: validationResult.error.details[0].message} )
    }

    const passwordHash = await bcrypt.hash(password, 8);

    const user = await User.findOne({
      email: email,
    });
    if (!user) {
      let newUser = await User.create({
        email,
        firstName,
        password: passwordHash,
      
      });

        const userSave = await new User(newUser).save()
         console.log(userSave)

      const { _id } = newUser;
     
    
      const token = jwt.sign({_id}, jwtsecret, { expiresIn: "30mins" });
     

      res.cookie("token", token, { httpOnly: true, maxAge: 30 * 60 * 1000 });
      //otp

      //email

      return res.redirect("/login")
   
    }
  return res.render("Register",{error:"email is already taken"})
    
    
  }catch (err) {
    console.log(err);
    // res.status(500).json({error: "Internal server error" });
  }
};

export const Login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    // console.log(req.body);

    const validationResult = loginUserSchema.validate(req.body, options);


    if (validationResult.error) {
    
      return res.render("Login", {error: validationResult.error.details[0].message} )
    }
    const user: UserDocument |any = await User.findOne({email: email })
   
    const { _id:_id } = user;


    const token = jwt.sign({_id }, jwtsecret, { expiresIn: "30d" });

 res.cookie("token", token, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
 
    const validUser = await bcrypt.compare(password, user.password);


    if (validUser) {
      return res.redirect('/dashboard')
    }
  res.render("Login",{error:"Invalid email/password"})

  } catch (err) {
    console.log(err);
  }
};


export const Logout = async (req: Request, res: Response) => {
  res.clearCookie('token');
   res.redirect('/login');
}