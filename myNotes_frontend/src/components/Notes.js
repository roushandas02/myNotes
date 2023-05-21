import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/NoteContext';
import Noteitem from './Noteitem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {
    const context = useContext(noteContext);
    const {notes, getNotes, editNote}= context;
    let navigate= useNavigate();

    //IF NOT LOGGED IN, REDIRECT TO LOGIN PAGE
    useEffect(()=>{
        if(localStorage.getItem('token')){
            getNotes()
        }
        else{
            navigate("/Login")
        }
        // eslint-disable-next-line
    }, [])
    
    const ref = useRef(null)
    const refClose = useRef(null)
    const [note, setNote]= useState({id: "", etitle:"", edescription:"", etag:""})

    const updateNote=(currentNote)=>{
        ref.current.click();
        setNote({id: currentNote._id, etitle: currentNote.title,edescription: currentNote.description,etag: currentNote.tag})
        
    }

    const handleClick = (e)=>{
        refClose.current.click();
        editNote(note.id, note.etitle, note.edescription, note.etag)
        props.showAlert("Updated Successfully", "success");
    }
    const onChange=(e) => {
        setNote({...note, [e.target.name]: e.target.value})
    }
  return (
    <div>
        <AddNote showAlert={props.showAlert}/>

        <button ref={ref}  type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
        </button>

      
        <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                <form>
                    <div className="mb-3">
                        <label htmlFor="etitle" className="form-label">Title</label>
                        <input type="text" className="form-control" value={note.etitle} onChange={onChange} id="etitle" name="etitle" aria-describedby="emailHelp"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="edescription" className="form-label">Description</label>
                        <input type="text" className="form-control" value={note.edescription} onChange={onChange} id="edescription" name="edescription"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="etag" className="form-label">Tag</label>
                        <input type="text" className="form-control" value={note.etag} onChange={onChange} id="etag" name="etag"/>
                    </div>
                    
                    {/* <button type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button> */}
                </form>
            </div>
            <div className="modal-footer">
                <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button disabled={note.etitle.length<5 || note.edescription.length<5} type="button" onClick={handleClick} className="btn btn-primary">Update Note</button>
            </div>
            </div>
        </div>
        </div>



      <div className="row my-3">
        <h2 className="text-center my-3">Your Notes</h2>
        <div className="container">
            {notes.length===0 && 'No notes to display'}
        </div>
        {notes.map((note)=>{
          return <Noteitem key={note.id} updateNote={updateNote} showAlert={props.showAlert} note={note}/> 
        })}
      </div>
    </div>
  )
}

export default Notes
