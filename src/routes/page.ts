import express, { NextFunction, Response, Request } from "express";
import { auth } from "../middlewares/auth";
import { Note } from "../model/noteModel";
import { createNoteSchema, options, updateNoteSchema } from "../utils/utils";


const router = express.Router();

//pages

router.get("/register", (req: Request, res: Response, next: NextFunction) => {
  res.render("Register");
});

router.get("/login", (req: Request, res: Response, next: NextFunction) => {
  res.render("Login");
});

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.render("HomePage");
});

router.get(
  "/dashboard",
  auth,
  (req: Request, res: Response, next: NextFunction) => {
    res.render("Dashboard");
  }
);

router.get("/logout", (req: Request, res: Response, next: NextFunction) => {
  res.render("HomePage");
});


router.get(
  "/notes",
  auth,
  async (req: Request | any, res: Response, next: NextFunction) => {
    const page: any = req.query.p || 0;
    const NotesPerPage = 3; 

    try {
      const { _id } = req.user;
      const getNotesData = await Note.find({ userId: _id })
        .skip(page * NotesPerPage)
        .limit(NotesPerPage);
      const totalCount = await Note.countDocuments({ userId: _id }); 
      const pageCount = Math.ceil(totalCount / NotesPerPage); 
      return res.render("Notes", {
        noteRecords: getNotesData,
        page,
        pageCount,
      });
    } catch (err) {
      console.log(err);
    }
  }
);

//create note
router.post(
  "/notes",
  auth,
  async (req: Request | any, res: Response, next: NextFunction) => {
    try {
      const { description, completed } = req.body;
      const { _id } = req.user;
      const validationResult = createNoteSchema.validate(req.body, options);
      if (validationResult.error) {
        return res
          .status(400)
          .json({ error: validationResult.error.details[0].message });
        res.render;
      }
      const note = await Note.create({
        description,
        completed,
        userId: _id,
      });
      // res.status(201).json({
      //               msg: "you have successfully created a note", note
      //           })
      res.redirect("/notes");
    } catch (err) {
      console.log(err);
    }
  }
);

// Delete Notes

router.get("/notes/delete/:_id", auth, async (req: Request, res: Response) => {
  try {
    const { _id } = req.params;
    const record = await Note.findOne({ _id });

    if (!record) {
      return res.render("Notes", { error: "Cannot find existing note" });
    }

    await record.deleteOne();
    return res.redirect("/notes");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
});



router.post("/update/:_id", async (req: Request, res: Response) => {
  try {
    const { _id } = req.params;

    const { completed } = req.body;
    
    const validationResult = updateNoteSchema.validate(req.body, options);

    if (validationResult.error) {
      return res
        .status(400)
        .json({ error: validationResult.error.details[0].message });
    }
    const updateNotes = await Note.findByIdAndUpdate(
      _id,
      {
        completed: req.body.completed,
      },
      {
        new: true,
      }
    );
    if (!updateNotes) {
      return res.render("Notes", { error: "Cannot find existing note" });
    }

    const updateRecord = await updateNotes.updateOne({
      completed,
    });

    res.status(201).json({
      msg: "you have successfully updated a note",
      updateRecord,
    });
     //res.redirect("/notes")
  } catch (error) {
    console.log(error);
  }
});

export default router;
