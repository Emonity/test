import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Addtask from './Components/Addtask'
import Tasklist from './Components/Tasklist'
import Updatetask from './Components/Updatetask'


function App() {
  const [taskList, setTaskList] = useState([])
  const [tasktoUpdate, setTasktoUpdate] = useState({})
  const [showPopup, setShowPopup] = useState(false)
  // const [sent, setSent] = useState(false)
  // const [text, setText] = useState("")

  // const handleSend = async () => {
  //   setSent(true)
  //   try {
  //     await axios.post('http://localhost:8000/sendmail', {
  //       text
  //     })
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  useEffect(() => {
    axios.get('http://localhost:8000/').then(res => {
      setTaskList(res.data)

    }).catch(err => console.log(err))
  }, [])

  const addTask = newTask => {
    setTaskList([...taskList, newTask])
  }

  const taskComplete = task => {
    const newList = [...taskList]
    newList.forEach(item => {
      if (item._id === task._id) {
        item.isComplete = task.isComplete
      }
    })
    setTaskList(newList)
  }

  const removeTask = task => {
    const newList = taskList.filter(item => !(item._id === task._id))
    setTaskList(newList)
  }

  const updatetask = task => {
    const newList = [...taskList]
    newList.forEach(item => {
      if (item._id === task._id) {
        item.tasks = task.tasks
      }
    })
    setTaskList(newList)
  }


  return (
    <div>
      <Addtask addTask={addTask} />
      <Tasklist taskList={taskList} taskComplete={taskComplete} removeTask={removeTask} tasktoUpdate={task => setTasktoUpdate(task)} showPopup={() => setShowPopup(!showPopup)} />
      {showPopup && <Updatetask task={tasktoUpdate} updatetask={updatetask} removePopup={() => setShowPopup(!showPopup)} />}


      {/* {!sent ? (
        <form onSubmit={handleSend}>
          <input type="text" value={text.taskList} onChange={(e) => setText(e.target.value)} />
          <button type = "submit"> send Mail</button>
        </form>
      ) : (
        <h1>email sent</h1>
      )} */}
    </div>
  )
}


export default App