import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import { handleChangeService } from '../../services/handleChangeService';
import { loginUser } from '../../services/authServices';
import styles from './LoginForm.module.css'

const LoginForm = ({setIsAuthenticated}) => {
    const [formData, setFormData] = useState({
        username:'',
        password:''
    })
    const navigate = useNavigate()

    const handleLoginSubmit = async (e) => {
        e.preventDefault()
        
        try {
            const token = await loginUser( formData.password, formData.username);
            
            if (token) {
                localStorage.setItem('authToken', token);
                setIsAuthenticated(true);
                alert("Login successful!");
                navigate('/tasks'); 
            }else {
                throw new Error ( 'Error creating a user')
            }
            }catch(error){
                console.error ("Register Error: ", error )
            }

    }


    return (
        <div className={styles.loginFormContainer}>   
            <h1 className={styles.loginTitle}>Task Manager</h1>
            <form className={styles.form} id='login-form' onSubmit={handleLoginSubmit}>
                <h2 className={styles.formTitle}>Sing in </h2>
                <div className={styles.labelContaner}>
                    <label className={styles.label} htmlFor='username'>Username:</label>
                </div>
                <div className={styles.inputContainer}>
                    <input  className={styles.input} type='text' id='username' name='username' placeholder='Jonh Lenon' onChange={(e)=>handleChangeService(e,setFormData)} required/>
                </div>
                <div  className={styles.labelContaner}>
                    <label className={styles.label} htmlFor='password'>Password:</label>
                </div>
                <div className={styles.inputContainer}>
                    <input  className={styles.input} type='password' id='password' name='password' onChange={(e)=>handleChangeService(e,setFormData)} required />
                </div>
                <div className={styles.btnContainer}>
                    <button className={styles.btn} type='submit' id='login-btn'>Submit</button>
                </div>
                
            </form>
        </div>
    )
}

export default LoginForm;