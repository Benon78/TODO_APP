import "./TodoLayout.css";  
import { NavLink, Link, Outlet} from "react-router-dom";  
import { FaClipboardList, FaCalendarCheck, FaCog } from "react-icons/fa";  
import { useState} from "react";  
import { userName }  from '../../../../firebaseConfig'

function TodoLayout() {  
  const activeStyles = {  
    color: "#D8605B",  
  };  

  // Fetch user data from context


  // Fetch todos from local storage
  const [todos, setTodo] = useState([]) 
  
  const [completedTodos, setCompletedTodos] = useState([])
  // Save todos to local storage  
 

  // Add todo function  
  const addTodo = (todo) => {  
    setTodo((prevTodos) => [...prevTodos, todo]);  
  };  

  // Delete todo function  
  const deleteTodo = (id) => {  
    setTodo((prevTodos) => prevTodos.filter((item) => item.id !== id));  
  };  

  const deleteCompletedTodo = (id) => {  
    setCompletedTodos((prevCompleted) => prevCompleted.filter((item) => item.id !== id));  
  };  

  // Complete todo function  
  const completeTodo = (id) => {  
    const selectedTodo = todos.find((item) => item.id === id);  
    if (selectedTodo) {  
      const completed = { ...selectedTodo, isCompleted: true };  
      setCompletedTodos((prevCompleted) => [...prevCompleted, completed]);  
      deleteTodo(id);  
    }  
  };  

  // Edit todo function  
  const editTodo = (id, updatedTodo) => {  
    setTodo((prevTodos) => prevTodos.map((item) => (item.id === id ? updatedTodo : item)));  
  };  

  // Undo todo function  
  const undoTodo = (id) => {  
    const selectedTodo = completedTodos.find((item) => item.id === id);  
    if (selectedTodo) {  
      const undoTodoItem = {...selectedTodo, isCompleted: false}
      setTodo((prevTodos) => [...prevTodos, undoTodoItem]);  
      setCompletedTodos((prevCompleted) => prevCompleted.filter((item) => item.id !== id));  
    }  
  };  

  return (  
    <div className="todo-layout">  
      <div className="sidebar-container">  
        <h2>Welcome <span>{userName ? userName : 'user'}</span></h2>  
        <div className="sidebar-content">  
          <NavLink  
            to="addToDo"  
            style={({ isActive }) => (isActive ? activeStyles : null)}>  
            <FaClipboardList  className="side-icon"/>Add Todo  
          </NavLink>  
          <NavLink  
            to="completed"  
            style={({ isActive }) => (isActive ? activeStyles : null)}>  
            <FaCalendarCheck className="side-icon" />Completed  
          </NavLink>  
        </div>  
        <Link to="/settings" className="setting-link">  
          <FaCog className="setting-icon" />  
        </Link>  
      </div>  
      <div className="todo-container">  
        <Outlet  
          context={{
            todos,  
            completedTodos,  
            addTodo,  
            completeTodo,  
            editTodo,  
            deleteTodo,  
            undoTodo,  
            deleteCompletedTodo,  
          }}  
        />  
      </div>  
    </div>  
  );  
}  

export default TodoLayout;