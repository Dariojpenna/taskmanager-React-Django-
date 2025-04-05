import { useParams } from "react-router-dom"   
import { useEffect, useState } from "react"

const TaskDetail = () => {
    const {id} = useParams();
    const [task,setTask] = useState(null)
    const token = localStorage.getItem('authToken')
    const [status, setStatus] = useState('')
    
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
    
    if(task){
        return (
            <div>
                <h1>Task Detail</h1>
    
                <p>task_name: {task.task_name}</p>
                <p>inicial_date:{task.inicial_date}</p>
                <p>final_date:{task.final_date}</p>
                <p>assigned_user: {task.assigned_user.username}</p>
                <p>task_description: {task.task_description}</p>
                <p>priority: {task.priority_display}</p>
                <p>status: {status ? 'Complete' : 'Pending'}</p>
            </div>
        )
    }
    
}

export default TaskDetail