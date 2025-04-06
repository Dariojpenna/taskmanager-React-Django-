import { useState } from "react"
import { handleChangeService } from "../../services/handleChangeService"   
import {useNavigate} from 'react-router-dom'
import styles from './createNewTask.module.css'

const CreateNewTask = () => {
    const token = localStorage.getItem('authToken')
    const [formdData, setFormData] = useState ({
        
        task_name:'',
        inicial_date:'',
        final_date:'',
        task_description:'',
        priority: '2',
    })

    const navigate= useNavigate()

    const handleNewTaskSubmit = async (e) => {
        e.preventDefault()

        try{
            const response = await fetch('http://127.0.0.1:8000/task_manager/create_task/',{
                method:'POST',
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body:JSON.stringify(formdData)

            })

            const data = await response.json()
            if (response.ok){
                alert('Task Create succesfully')
                navigate('/tasks')
            }else {
                throw new Error (data.message || 'Error creating a task')
            }
        }catch(error){
            console.error('Error creating a task')
        }
    }


    return (
        <div className={styles.createNewTaskContainer}>
            <h1>Create a New Task</h1>
            <form className={styles.form} onSubmit={handleNewTaskSubmit}>
                <div className={styles.labelContaner}>
                    <label className={styles.label} htmlFor='task_name'>Task:</label>
                </div>
                <div className={styles.inputContainer}>
                    <input className={styles.input} type='text' id='task_name' name= 'task_name' onChange={(e)=>handleChangeService(e,setFormData)} required />
                </div>
                <div className={styles.labelContaner}>
                    <label className={styles.label} htmlFor='inicial_date'>Inicial Date:</label>
                </div>
                <div className={styles.inputContainer}>
                    <input className={styles.input} type='date' id='inicial_date' name='inicial_date' onChange={(e)=>handleChangeService(e,setFormData)} required/>
                </div>
                <div className={styles.labelContaner}>
                    <label className={styles.label} htmlFor='final_date'>Final Date:</label>
                </div>
                <div className={styles.inputContainer}>
                    <input className={styles.input} type='date' id='final_date' name='final_date' onChange={(e)=>handleChangeService(e,setFormData)}  required/>
                </div>
                <div className={styles.labelContaner}>
                    <label className={styles.label} htmlFor='task_description'>Description:</label>
                </div>
                <div className={styles.inputContainer}>
                    <textarea className={styles.input} id="task_description" name="task_description" rows="4" cols="50" onChange={(e)=>handleChangeService(e,setFormData)}  required></textarea>
                </div>
                <div className={styles.labelContaner}>
                    <label className={styles.label} htmlFor='priority'>Priority:</label>
                </div>
                <div className={styles.inputContainer}>
                    <select className={styles.input} id='priority' name="priority" required value={formdData.priority}  onChange={(e)=>handleChangeService(e,setFormData)}>
                        <option value='1' >Alta</option>
                        <option value='2' >Media</option>
                        <option value='3'>Baja</option>
                    </select>
                </div>
                <div className={styles.btnContainer}>
                    <button className={styles.btn} type='submit' id='NewTaskBtn'>Create</button>
                </div>
                
            </form>
        </div>
    )
}

export default CreateNewTask