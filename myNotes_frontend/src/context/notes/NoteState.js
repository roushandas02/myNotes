import React, {useState} from "react";
import NoteContext from "./NoteContext";
import { BACKEND_URL } from "../../components/BackendLink";

const NoteState = (props) =>{
    // const host="http://localhost:5000"
    const host=`${BACKEND_URL}`
    const notesInitial = []
      const [notes, setNotes] = useState(notesInitial)

      //Get all notes
      const getNotes=async ()=>{
        //API call
        const response= await fetch(`${host}/api/notes/fetchallnotes`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
            

          });
          const json=await response.json();
          console.log(json)
          setNotes(json)
           
      }
      //Add a note
      const addNote=async (title, description, tag)=>{
        //TODO API call

        //API call
        const response= await fetch(`${host}/api/notes/addnote`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({title, description, tag})

          });
          const note=await response.json();
          //concat returns an array whereas push updates an array
          setNotes(notes.concat(note))
      }
      //Delete a note
      const deleteNote=async (id)=>{
        //API call
        const response= await fetch(`${host}/api/notes/deletenote/${id}`,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },

          });
           const json=await response.json();
           console.log(json)

          console.log("del note with id" + id);
           const newNotes = notes.filter((note)=>{return note._id!==id})
           setNotes(newNotes)
      }
      

      //Edit a note
      const editNote=async(id, title, description, tag)=>{
        //API call
          const response= await fetch(`${host}/api/notes/updatenote/${id}`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({title, description, tag})

          });
          const json=await response.json();
          console.log(json)


          let newNotes=JSON.parse(JSON.stringify(notes))
        //logic to edit an element
          for(let index=0;index<notes.length;index++){
            const element=newNotes[index]; 
            if(element._id===id){
                newNotes[index].title=title;
                newNotes[index].description=description;
                newNotes[index].tag=tag;
                break;
            }
            
          }
          setNotes(newNotes);
      }


    return (
        <NoteContext.Provider value={{notes, addNote, editNote, deleteNote, getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}



export default NoteState;