import mongoose from "mongoose";
import { connectDB, dropDB, dropCollections } from "./setuptestdb";
import { Note } from "../model/noteModel";
import request from "supertest";
import app from "../app";
import { v4 as uuidv4 } from 'uuid';

const baseURL: string = "http://localhost:3000";

beforeAll(async () => {
  await connectDB();
});
afterAll(async () => {
  await dropDB();
});
afterEach(async () => {
  await dropCollections();
});
//test post 
describe("Note", () => {
  it("should create a note item successfully", async () => {
    let validNote = {
      description: "Going Shopping",
      completed: false,
    };
    const newNote = new Note(validNote);
    await newNote.save();

    expect(newNote._id).toBeDefined();
    expect(newNote.description).toBe(validNote.description);
    expect(newNote.completed).toBe(validNote.completed);
  });
});

it("should fail for note item without required fields", async () => {
  let invalidNote = {
    description: "Going Shopping",
  };
  try {
    const newNote = new Note(invalidNote);
    await newNote.save();
  } catch (error) {
    const err = error as mongoose.Error.ValidationError;
    // expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.completed).toBeDefined();
  }
});

it("should fail for note item with fields of wrong type", async () => {
  let invalidNote = {
    description: "Going Shopping",
    completed: "False",
  };
  try {
    const newNote = new Note(invalidNote);
    await newNote.save();
  } catch (error) {
    const err = error as mongoose.Error.ValidationError;
    //expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.completed).toBeDefined();
  }
});

  //test delete
test("should delete a note successfully", async () => {
    const newNote = new Note({
      description: "Going Shopping",
      completed: false,
    });
  
    await newNote.save();
  
    const deleteResult = await Note.deleteOne({ _id: newNote._id });
  
    expect(deleteResult.deletedCount).toEqual(1);
  });

  //test update note
  test("user should update a note successfully", async () => {
    // create a new note
    const note = await Note.create({
      description: "Buy groceries",
      completed: false,
    });
  
    const updatedData = {
      description: "Buy milk and bread",
      completed: true,
    };
    const updatedNote = await Note.findByIdAndUpdate(note._id, updatedData, { new: true });
  
    expect(updatedNote).not.toBeNull();
    expect(updatedNote?.description).toEqual(updatedData.description);
    expect(updatedNote?.completed).toEqual(updatedData.completed);
  });
  