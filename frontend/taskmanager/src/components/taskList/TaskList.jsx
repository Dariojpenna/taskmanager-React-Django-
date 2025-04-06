import { useEffect, useState } from "react"
import Task from '../task/Task'
import styles from  './taskList.module.css'

const TaskList = () => {
    const [taskList, setTaskList] = useState([]);
    const token = localStorage.getItem('authToken');
    
    useEffect (()=>{
        const fetchTasksList = async () =>{
            try{
                const response = await fetch('http://127.0.0.1:8000/task_manager/tasks/',{
                    method:'GET',
                    headers:{
                        'Content-Type':'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                })
        
                const data = await response.json()
                if(response.ok && Array.isArray(data)){
                    setTaskList(data);
                    
                }else {
                    throw new Error (data.message || 'Error to get tasks')
                }
            }catch(error){
                console.error('Error geting the tasks:', error);
            }
        }

        if(token){
            fetchTasksList()
        }
        
    }, [token])


    


    if(taskList.length === 0){
        return <p>There is no Tasks yet</p>
    }else{
        return (
            <div className={styles.taskListContainer}>
                <h1>Task List</h1>
                <ul className={styles.ulContainer}>
                    
                    <li className={styles.liContainer}>
                        <p className={styles.pContainer} >
                            <strong>Name: </strong>  
                        </p>
                        <p className={styles.pContainer}>
                            <strong>Final Date: </strong>
                        </p>
                        <p className={styles.pContainer}>
                            <strong>Priority: </strong>
                        </p>
                        <p className={styles.pContainer}>
                        <strong>Status: </strong>
                        </p>
                        <p className={styles.pContainer}>
                            
                        </p>
                    </li>
                    {taskList.map((task)=>(
                        <Task key={task.id} task={task}  />
                    ))}
                </ul>
                
            </div>   
        )
    }
}

export default TaskList