import { NextFunction } from 'express';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken'
import { User} from '../model/userModel' 

 
/*-----------------------API MIDDLEWARE----------------------*/
// const jwtsecret = process.env.JWT_SECRET as string;


// export async function auth(req: Request|any, res: Response, next:NextFunction) {
//     try {
    
//  const authorization = req.cookies.token;
     
//         if (!authorization) {
//             return res.status(401).json({error:'Kindly register/sign in as a user'}) 
//         }

//   let verified = jwt.verify(authorization, jwtsecret);
//         if (!verified) {
//             return res.status(401).json({ error: "token invalid, you cannot access this route" }); 
//         }
//         const { _id } = verified as { [key: string]: string };
      
//         const user = await User.findOne({ _id })
//         if (!user) {
//              return res
//                .status(401)
//                .json({ error: 'Kindly sign in as user' });
//         }
//         req.user = verified
//         next();

//     } catch (err) {
//         // res.status(401).json({error:'User not logged in'})
//         console.log(err)
//     }

    
//     //401 - not authorized 
// }



/*----------------------------EJS MIDDLEWARE--------------------------*/
const jwtsecret = process.env.JWT_SECRET as string;


export async function auth(req: Request|any, res: Response, next:NextFunction) {
    try {
    
 const authorization = req.cookies.token;
     
        if (!authorization) {
            // return res.status(401).json({error:'Kindly register/sign in as a user'}) 
            return res.redirect('/login')
        }


  let verified = jwt.verify(authorization, jwtsecret);
        if (!verified) {
            return res.status(401).json({ error: "token invalid, you cannot access this route" }); 
        }
        const { _id } = verified as { [key: string]: string };
      
        const user = await User.findOne({ _id })
        if (!user) {
            //  return res
            //    .status(401)
            //    .json({ error: 'Kindly sign in as user' });
            return res.redirect('/login')
        }
        req.user = verified
        next();

    } catch (err) {
        // res.status(401).json({error:'User not logged in'})
        return res.redirect('/login')
        console.log(err)
    }
}