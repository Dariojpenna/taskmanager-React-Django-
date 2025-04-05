
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import LoginForm from './components/loginForm/LoginForm';
import { useState } from 'react';
import RegisterForm from './components/registerForm/RegisterForm';
import TaskList from './components/taskList/TaskList';
import CreateNewTask from './components/createNewTask/CreateNewTask';
import TaskDetail from './components/taskDetail/TaskDetail'



function App() {
  const [isAuthenticated,setIsAuthenticated] = useState(
    !!localStorage.getItem('authToken')
  );
  const navigate = useNavigate()

  const handleLogOut = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
    navigate('/')
  
  }

  return (
    <div className="App">
      <main>
        
          <nav>
            {!isAuthenticated ? (
              <>
                <Link to='/'>Login</Link>
              </>
            ) : (
              <span onClick={handleLogOut}>Log Out</span>
            )}  
            {!isAuthenticated && (
              <>
                <Link to='/register'>Sing Up</Link>
              </>
            )}  
            {isAuthenticated && (
              <>
                <Link to='/tasks'>Task List</Link>
              </>
            )}  
            {isAuthenticated && (
              <>
                <Link to='/create_task/'>New Task</Link>
              </>
            )}
            
            
          </nav>


            <Routes>
              <Route path='/' element={<LoginForm setIsAuthenticated={setIsAuthenticated} />} />
              <Route path='/register' element={<RegisterForm />}/>
              <Route path='/tasks' element={<TaskList  />}/>
              <Route path='create_task/' element= {<CreateNewTask />} />
              <Route path="/task_detail/:id" element={<TaskDetail />} />
            </Routes>
        
      </main>
      
    </div>
  );
}

export default App;
