import {useState} from 'react'
import {handleChangeService} from '../../services/handleChangeService'
import { useNavigate } from 'react-router-dom';
import styles from './RegisterForm.module.css'

const RegisterForm = () => {
    const [formData, setFormData]= useState({
            
        username:'',
        password:'',
        email:'',
    });
    const navigate = useNavigate()

    const handleRegisterSubmitt = async(e) => {
        e.preventDefault()
        
        try{
            const response = await fetch('http://127.0.0.1:8000/task_manager/register/',{
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                
                body: JSON.stringify(formData),
            })

            const data = await response.json()

            if(response.ok){
                alert('User crate succesfully')
                navigate('/')
            }else {
                throw new Error (data.message || 'Error creating a user')
            }

        }catch(error){
            console.error("Register Error: ", error);
        }

    }

    return (
        <div className={styles.registerFormContainer}>
            <h1 className={styles.RegisterTitle}>Register Form</h1>
            <form className={styles.form} id="register-form" onSubmit={handleRegisterSubmitt}>
                <div className={styles.labelContaner}>
                    <label className={styles.label} htmlFor='username'>Username:</label>
                </div>
                <div className={styles.inputContainer}>
                    <input  className={styles.input} type='text' id='username' name='username'  onChange={(e)=>handleChangeService(e,setFormData)} required/>
                </div>
                <div  className={styles.labelContaner}>
                    <label className={styles.label} htmlFor='password'>Password:</label>
                </div>
                <div className={styles.inputContainer}>
                    <input  className={styles.input} type='password' id='password' name='password' onChange={(e)=>handleChangeService(e,setFormData)} required />
                </div>
                <div className={styles.labelContaner}>
                    <label className={styles.label} htmlFor='email'>Email</label>
                </div>
                <div className={styles.inputContainer}>
                    <input className={styles.input} type='email' id='email' name='email' onChange={(e)=>handleChangeService(e,setFormData)} required placeholder='@exp.com'/>
                </div>
                <div className={styles.btnContainer}>
                    <button className={styles.btn} type='submit' id='register-btn'>Submit</button>
                </div>
            </form>
        </div>
    )
}

export default RegisterForm