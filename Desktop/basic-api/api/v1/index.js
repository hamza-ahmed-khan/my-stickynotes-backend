const express = require('express');
var notesrouter = express.Router();
const mongoose = require("mongoose");
const NoteModel = require("../../db/models/note.model");

//get all notes

notesrouter.get("/",(request,response) => {
    NoteModel.find({},(err,notes)=>{
        if(err){
            return console.error(err);
        }
        response.json({
            notes,
        });
    });

});

//add new note
  
notesrouter.post("/",(request,response) => {
    console.log(request.body);
    const newNote = new NoteModel(request.body);
    newNote.save().then((savedNote) => {
        response.json({
            note: savedNote,
        });
    });
    

});

//get note by id

notesrouter.get("/:id",(request,response) => {
    const noteId = request.params.id;
    NoteModel.findById(noteId,(err,note)=>{
        if(err){
            return console.log(err);
        }
        if(!note){
            return response.status(404).json(
                {messege:"note not found"}
            )
        }
        response.json({
            reply:"note by id succeed",
            note,
        });
    })

});

//delete note by id

notesrouter.delete("/:id",(request,response) => {
    const noteId = request.params.id;
    NoteModel.findByIdAndRemove(noteId,(err,deletedNoted)=>{
        console.log(err,deletedNoted);
        if(err){
            return console.log(err);
        };
        if(!deletedNoted){
            return response.status(404).json({
                messege:"note not found for deletiion"
            })
        }
        response.json({
            reply:"Delete note by id succeed",
        });
    });

});

notesrouter.put("/:id",(request,response) => {
    const noteId = request.params.id;
    const updatedBody = request.body;
    NoteModel.findByIdAndUpdate(noteId,updatedBody,{new:true},(err,updatedNote)=>{
        if(err){
            return console.log(err);
        };
        if(!updatedNote){
            return response.status(404).json({
                messege:"note not found to update"
            });
        };
        response.json({
            reply:"update note by id successful",
            note:updatedNote,
        });
    });

});


module.exports = {
    notesrouter
}