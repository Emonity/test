import './Addtask.css'
import React, { useState } from 'react'
import axios from 'axios'

function Addtask(props) {
    const [tasks, setTask] = useState("")
    const [mail, setMail] = useState("")
    const addtask = () => {
        if (tasks.trim() === '') {
            return
        } else {
            axios.post('http://localhost:8000/', {
                tasks: tasks,
                email: mail,
                isComplete: false
            }).then(res => {
                setTask("")
                setMail("")
                props.addTask(res.data)
            }).catch(err => console.log(err))
        }
    }
    return (
        <div className='addtask'>
            <input type='text' placeholder='task' value={tasks} onChange=
                {event => setTask(event.target.value)} />
            <input type='text-email' placeholder='email' value={mail} onChange=
                {event => setMail(event.target.value)} />
            <button onClick={() => addtask()}> Add task</button>
        </div>
    )
}

export default Addtask