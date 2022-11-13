import React, { useState } from 'react'
import noteContext from './NoteContext'
import axios from 'axios'

const NoteState = (props) => {
    const HOST="https://3gl2n1ocik.execute-api.ap-south-1.amazonaws.com/DEV/"

    const [notes, setnotes] = useState([])
    // console.log("notes:",notes)
    
    //getNotes
    const getNotes = async ()=>{
        //TODO: add notes api
        console.log("fatching note")
        // const url=`${HOST}notes/fetchnotes`
        // console.log("get req:",localStorage.getItem('token'))
        const response = await axios(`${HOST}notes/fetchnotes`, {
            headers: {
              'Content-Type': 'application/json',
              'authToken': localStorage.getItem('token')
            }
          });
          // const json = await response.json()
          // console.log("res: ",response.data)
          setnotes(response.data)
          // console.log("note:",notes)
    }

    //addNotes
    const addNotes = async (title,desc,tag)=>{
        //TODO: add notes api
        console.log("adding note")
        // console.log("axios add note: ",title,desc,tag)
        const response = await axios.post(`${HOST}notes/addnotes`,{title,desc,tag}, { 
            headers: {
              'Content-Type': 'application/json',
              'authToken': localStorage.getItem('token')
            }
          });
          const note = {title:title,description:desc,tag:tag}
          // console.log("res: ",response.data)
          setnotes(notes.concat(note))
    }

    //deleteNotes
    const deleteNotes = async (title)=>{
        //TODO: add notes api
        console.log("deleting note")
        // console.log(`${HOST}notes/deletenotes?title=${title}`)
        const response = await axios.delete(`${HOST}notes/deletenotes?title=${title}`, {
            headers: {
              'Content-Type': 'application/json',
              'authToken': localStorage.getItem('token')
            }
          });
          // const json = await response.json()
          // console.log(response)
        //logic to delete note
        const newNotes=notes.filter((note)=>{return note.title!==title})
        setnotes(newNotes)
    }

    //editNotes
    const editNotes = async (title,desc,tag)=>{
        //API call
        console.log("updating note")
        const response = await axios.put(`${HOST}notes/updatenotes?title=${title}`,{title,desc,tag}, {
            headers: {
              'Content-Type': 'application/json',
              'authtoken': localStorage.getItem('token')
            }
          });
          // const json = await response.json()
          // console.log(response)
        
        //edit notes in client
        let newNotes=JSON.parse(JSON.stringify(notes))
        for (let index = 0; index < notes.length; index++) {
          const element = newNotes[index];
          // console.log("notes",index,": ",notes[index])
          if(element.title===title){
            // element.title=title;
            element.description=desc;
            element.tag=tag;
                break;    
            }
            setnotes(newNotes)  
        }
    }
    
    return (
        <noteContext.Provider value={{ 
            notes,
            addNotes,
            deleteNotes,
            editNotes,
            getNotes,
        }}>
            {props.children}
            
        </noteContext.Provider >
    )
}
export default NoteState