import { Request, Response, NextFunction } from 'express' 
import { v4 as uuidv4 } from 'uuid'
import { Note} from '../model/noteModel';
import { updateNoteSchema,createNoteSchema,options } from "../utils/utils";


// export const CreateNote = async (req: Request| any, res: Response, next:NextFunction) => {

//     try {
//         const verified = req.user;
//         

//             const id = uuidv4();
//         // const { description, completed } = req.body;
//         const noteRecord = await Note.create({
//             id,
//             ...req.body,
//             userId:verified._id
//         }) 
//         const noteSave = await new Note(noteRecord).save()
//       
//           const validationResult = createNoteSchema.validate(req.body, options);

//           if (validationResult.error) {
//             return res
//               .status(400)
//               .json({ Error: validationResult.error.details[0].message });
//           }
//         return res.status(201).json({
//             msg: "you have successfully created a note", noteRecord
//         })

//     } catch (err) {
//         console.log(err)
//     }
// }

// export const getNotes = async ( req: Request, res: Response, next: NextFunction) => {
//    const page: any = req.query.p || 0 
//    const NotesPerPage = 5 
//    try
//     { const getNotesData = await Note.find() 
//     .skip(page * NotesPerPage) 
//     .limit(NotesPerPage); 
//     res.send({ success: true, path: req.url, data: getNotesData, });
//    } catch (error) { 
//     // const err = error as ErrorType; 
//     return res.status(500).send({ status: "error"}); 
//   } 
// };

// export const getNotes = async (req: Request, res: Response) => {
//   try {
//     const limit = req.query?.limit as number | undefined;
//     const offset = req.query?.offset as number | undefined;
   
//     const getAllNotes = await Note.find({})
//     // .limit(limit)
//     // .skip(offset)
//     // .exec();

//   const count = await Note.countDocuments({});

//     return res.status(200).json({
//       msg: "You have successfully retrieved all data",
//       count,
//       note: getAllNotes,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// }


//   export const updateNote = async (req: Request, res: Response) => {
//       try {
        
//           const { id } = req.params
        
//         const { completed } = req.body;
//           const validationResult = updateNoteSchema.validate(req.body, options);

//           if (validationResult.error) {
//               return res.status(400).json({Error: validationResult.error.details[0].message})
//           }
//           const updateNotes = await Note.findOne({_id: id})
//           if (!updateNotes) {
//               return res.status(400).json({
//                   error: "Cannot find existing note",
//               })
//           }
//           const updateRecord = await updateNotes.updateOne({
//             completed
//           })
//           return res.status(200).json({
//             msg: "you have successfully updated your note",
//             updateRecord
//           })
//       } catch (error) {
//     console.log(error);
//   }
// }

// export const deleteNote = async (req: Request, res: Response) => {
//     try {
//           const { id } = req.params
//           const record = await Note.findOne({_id: id })
//           if (!record) {
//               return res.status(400).json({error:"Cannot find existing note"})
//           }
//         const deletedRecord = await Note.deleteOne({_id:id});

//           return res.status(200).json({
//               msg: "You have successfully deleted your note",
//               record: deletedRecord 
//           })
//       } catch (error) {
//     console.log(error);
//   }
// }