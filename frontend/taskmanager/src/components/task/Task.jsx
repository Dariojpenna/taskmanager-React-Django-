import { useState } from "react"
import styles from './Task.module.css'
import { useNavigate } from 'react-router-dom'

const Task = ({task, onDelete}) => {
    const [status, setStatus] = useState(task.status)
    const priorityClass = task.priority_display.toLowerCase();
    
    const token = localStorage.getItem('authToken')
    const navigate = useNavigate()


    const handleStatus = async () => {
        const newStatus = !status;
        
        try {
            const response = await  fetch( `http://127.0.0.1:8000/task_manager/update_task/${task.id}`,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({...task, status: newStatus})
            })

            const data = await response.json()
            
            if (response.ok){
                setStatus(newStatus)
            }else{
                throw new Error (data.message || 'Error to change status')
            }

        }catch (error) {
            console.error ("Change status Error: ", error)
        }

    }

  

    const handleTaskDetail = () => {
        try {
            navigate(`/task_detail/${task.id}`)

        }catch (error){

        }
    }

return (
    
    <div className={styles.Container}>
        <li  className={styles.liContainer}>
            <p className={styles.pContainer} onClick={()=>{handleTaskDetail()}}><span className={styles.name}>{task.task_name}</span></p>
            <p className={styles.pContainer} >{task.final_date}</p>
            <p className={`${styles.taskItem} ${styles[priorityClass]}`} >{task.priority_display}</p>
            <p className={styles.pContainer} >{status ? 'Complete':'Pending' }</p>
            <button className={styles.statusBtn} onClick={handleStatus}>Status</button>

        </li>
        
    </div>
)}

export default Task