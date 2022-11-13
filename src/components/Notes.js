import React, { useState, useContext, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import noteContext from '../context/NoteContext'
import { NoteItem } from './NoteItem'

export const Notes = () => {
    const context = useContext(noteContext)
    const { notes, getNotes, editNotes} = context
    const [note, setnote] = useState({ etitle: "", edescription: "", etag: "" })
    const ref = useRef(null)
    const refClose = useRef(null)
    const Navigate=useNavigate()

    useEffect(() => {
        // console.log(localStorage.getItem('token'))
        if(localStorage.getItem('token')){
            getNotes()
        }
        else{
            Navigate('/login')
        }
    }, [])
    const updateNote = (currentNote) => {
        ref.current.click()
        setnote({ etitle: currentNote.title, etag: currentNote.tag, edescription: currentNote.description })
    }

    const handleClick = (e) => {
        // console.log("updating note:", note)
        editNotes(note.etitle, note.edescription, note.etag)
        refClose.current.click()
        // console.log("updating note:", note)
    }
    const onChange = (e) => {
        setnote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <div className='row'>
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal" >
                modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className='my-3'>
                                <div className='mb-3'>
                                    <input disabled type="text" className='form-control' name="etitle" placeholder='Title' value={note.etitle} onChange={onChange}></input>
                                </div>
                                <div className='mb-3'>
                                    <input type="text" className="form-control" name="etag" placeholder='Tag' value={note.etag} onChange={onChange}></input>
                                </div>
                                <div className='mb-3'>
                                    <textarea type="text" className="form-control " rows="8" name="edescription" value={note.edescription} placeholder='Description' onChange={onChange}></textarea>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.edescription.length < 5 || note.etitle.length < 5} onClick={handleClick} type="button" className="btn btn-primary">Update note</button>
                        </div>
                    </div>
                </div>
            </div>
            <h2>Your Notes</h2>
            {notes.length===0 && "NO notes to display"}
            {notes.map((note) => {
                return <NoteItem key={note.title} note={note } updateNote={updateNote}  />
            })}
        </div>
    )
}
