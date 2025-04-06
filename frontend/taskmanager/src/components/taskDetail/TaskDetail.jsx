import { useParams, useNavigate } from "react-router-dom"   
import { useEffect, useState } from "react"
import styles from './taskDetail.module.css'

const TaskDetail = () => {
    const {id} = useParams();
    const [task,setTask] = useState(null)
    const token = localStorage.getItem('authToken')
    const [status, setStatus] = useState('')
    const navigate = useNavigate()
    
    useEffect (()=>{

        const fetchTaskDetail = async ()=> {

            try{
                const response =  await fetch(`http://127.0.0.1:8000/task_manager/task_detail/${id}`,{
                    method: 'GET',
                    headers: {
                            'Content-Type': 'Application/json',
                            'Authorization': `Bearer ${token}`
                    }
                })
                const data = await response.json()
                    
                if(response.ok){
                    setTask(data)
                    setStatus(data.status)
                } 
            }catch(error){
                console.error(error)
            }
        }
        
        if(token){
            fetchTaskDetail()
        }
    },[token])

    const handleDeleteTask = async ()=>{
            console.log(task.id)
            try {
                const response = await fetch(`http://127.0.0.1:8000/task_manager/delete_task/${task.id}`,{
                    method: 'POST',
                    headers: {
                        'Content-Type':'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                })
                const updatedTasks = await response.json();
    
                if(response.ok && Array.isArray(updatedTasks)){
                    navigate('/tasks')
                } else {
                    throw new Error("Error deleting task");
                }        
            }catch(error){
                console.error ("Delete task Error: ", error)
            }
        }

    if(task){
        const priorityClass = task.priority_display.toLowerCase();
        return (
            <div className={styles.container}>
                    <h1>Task Detail</h1>
                    <li  className={styles.liContainer}>
                        <div className={styles.priorityContainer}>
                        <p className={`${styles.taskItem} ${styles[priorityClass]}`} >{task.priority_display}</p>
                        </div>
                        <div className={styles.nameDetailContainer}>
                            <p className={styles.pContainer} ><h2>{task.task_name}</h2></p>
                        </div>
                        <div className={styles.taskHead}>
                            <p><strong>Inicial Date:  </strong>{task.inicial_date}</p>
                            <p className={styles.pContainer} ><strong>Final Date:  </strong>{task.final_date}</p>
                            <p><strong>Assigned to: </strong>{task.assigned_user.username}</p>
                            
                        </div>
                        
                        <br />
                        <p>{task.task_description}</p>
                        <br />
                        <button className={styles.btn} onClick={()=>{handleDeleteTask()}}>Delete</button>
                        <button className={styles.btn} onClick={() => navigate('/tasks')}>← Volver</button>
                    </li>
                    
                </div>
        )
    }
    
}

export default TaskDetail