import './Tasklist.css'
import React, { useState } from 'react'
import CheckIcon from '@material-ui/icons/Check'
import EditIcon from '@material-ui/icons/Edit'
import CloseIcon from '@material-ui/icons/Close'
import DraftsIcon from '@mui/icons-material/Drafts'
import axios from 'axios'


function Tasklist(props) {
    const [sent, setSent] = useState(false)
    const [text, setText] = useState("")

    const taskList = props.taskList.map((task, index) => {
        const taskComplete = task => {
            axios.put('http://localhost:8000/' + task._id, {
                _id: task._id,
                tasks: task.tasks,
                email: task.email,
                isComplete: !task.isComplete
            }).then(res => props.taskComplete(res.data)).catch(err => console.log(err))
        }
        const handleSend = async () => {
            setSent(true)
            try {
                await axios.post('http://localhost:8000/sendmail', {
                    text
                })
            } catch (error) {
                console.log(error)
            }
        }


        const removeTask = id => {
            axios.delete(`http://localhost:8000/` + id).then(res => props.removeTask(res.data)).catch(err => console.log(err))
        }

        return <li key={index}>
            <div style={{ display: 'flex' }}>
                <CheckIcon className={task.isComplete ? 'isComplete' : 'checkicon'} />
                <p className={task.isComplete ? 'taskcomplete' : ''} onClick={() => {
                    taskComplete(task)
                }}>{task.tasks}<div>{task.email}</div></p>
            </div>

            <div>
                <EditIcon className='edit' onClick={() => {
                    props.tasktoUpdate(task)
                    props.showPopup()
                }} />
                <CloseIcon className='close' onClick={() => {
                    removeTask(task._id)
                }} />
                <DraftsIcon className='draftsIcon' onClick={() => {
                    if (task.isComplete === true) {
                        console.log("unlucky");
                    }

                    !sent ? (
                        <form onSubmit={handleSend}>
                            <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
                            <button type="submit"> send Mail</button>
                            
                        </form>
                    ) : (
                        <h1>email sent</h1>
                    )

                    handleSend()
                }}></DraftsIcon>
            </div>
        </li>
    })

    return (
        <div className='tasklist'>
            <ul>
                {taskList}
            </ul>
        </div>
    )
}

export default Tasklist