import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import { useState, useEffect } from 'react'
import { FaTheaterMasks } from 'react-icons/fa'


function App() {
  const [showAddTask,setShowAddTask] = useState(false) 
  const [tasks, setTasks] = useState([])
  //Add Task

  useEffect(()=> {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks() 
      setTasks(tasksFromServer)
    }
    getTasks()
  },[])

  //Fetch tasks
  const fetchTasks = async () => {
      const res = await fetch('http://localhost:5000/tasks')
      const data = await res.json()
      console.log(data)

      return data
    }
    

  const addTask = async (task) => {
    
    const res = await fetch('http://localhost:5000/tasks/',{ 
      method: 'POST',
      headers: {
      'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    })
    const data = await res.json()
    setTasks([...tasks,data])
  //const id = Math.floor(Math.random()*10000)+1 
  //const newTask = { id, ...task }
  //setTasks([...tasks,newTask])
  }
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`,{method: 'DELETE'})
    setTasks(tasks.filter((task)=> task.id !== id))
  }

  //Toggle reminder
  const toggleReminder = (id) => {
    setTasks(
      tasks.map((task) => task.id === id ? { ...task, reminder: !task.reminder} : task
      )
    )
  }




  //create components - think of interface as bunch of (reusable) components
  return (
    <div className="container">
      <Header title = 'Task Tracker og' onAdd = {()=> setShowAddTask(!showAddTask)}
      showAdd = {showAddTask} />
      {showAddTask && <AddTask onAdd = {addTask} />}
      {tasks.length > 0 ? 
        (
         <Tasks 
         tasks = {tasks} 
         onDelete = {deleteTask} 
         onToggle = {toggleReminder} />
        ): ('no tasks to show')}
    </div>
   
  )
}



export default App;
