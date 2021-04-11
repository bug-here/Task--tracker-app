import { useState,useEffect} from 'react'
import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'

const App = () =>
{ 
  const [showAddTask,setShowAddTask]=useState(false)
  const [tasks,setTasks,] =useState([]) 
  useEffect(()=>{
  const getTasks=async () =>{
    const tasksFromServer  = await fetchTasks()
    setTasks(tasksFromServer)
  }
    
getTasks()
  } ,[])



//fetchtasks
const fetchTasks=async()=>{
  const res=await fetch('http://localhost:5000/tasks')
  const data = await res.json()
return data}
  //ADDTASK
  const addTask=(task)=>{
      const id=Math.floor(Math.random()*
       10000)   + 1
      const newTask = { id, ...task}
  setTasks([...tasks,newTask])
  }

 //delete task
 const deleteTask= async(id) => {
   await fetch('http:localllhost:5000/tasks/${id} ',{
     method:'DELETE'
   })

   setTasks(tasks.filter((task)=>task.id!==id))
 }
 // TOGGLE REMAINDER
 const toggleRemainder=(id)=> {
   setTasks(tasks.map((task)=>task.id===id
   ?{...task,remainder:!task.remainder}:task))
 }
  return (
    <div className="container">
    
      <Header onAdd={()=>setShowAddTask(!showAddTask)}
      showAdd={showAddTask}
      />
     {showAddTask && <AddTask onAdd={addTask}/>}

   {tasks.length>0 ?( <Tasks tasks={tasks} onDelete={deleteTask} 
     onToggle={toggleRemainder} />
      ):('NO TASKS TO SHOW')}
    
    </div>
  );
}


export default App;
