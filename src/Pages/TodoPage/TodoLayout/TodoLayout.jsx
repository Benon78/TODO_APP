import "./TodoLayout.css";  
import { NavLink, Link, Outlet, useOutletContext } from "react-router-dom";  
import { FaClipboardList, FaCalendarCheck, FaCog } from "react-icons/fa";  
import { useState, useEffect } from "react";  
import { getStoredTodos } from '../../../ComponentLayout/Hooks/utils'

function TodoLayout() {  
  const activeStyles = {  
    color: "#D8605B",  
  };  

  // Fetch user data from context
  const user  = useOutletContext();
  const userId = user?.userId
  const email = user?.email
  const username = user?.username

  // Fetch todos from local storage
  const [todos, setTodo] = useState(()=>{
    const localTodos = getStoredTodos("todos");
    return localTodos[userId] || []; 
  }
  );  
  const [completedTodos, setCompletedTodos] = useState(()=>{
    const localCompletedTodos = getStoredTodos("completedTodo");
    return localCompletedTodos[userId] || [];
  });  
  // Save todos to local storage  
  useEffect(() => {  
    const storedLocalTodos = getStoredTodos("todos");  
    storedLocalTodos[userId] = todos;
    localStorage.setItem("todos", JSON.stringify(storedLocalTodos)); 

    const storedLocalCompletedTodos = getStoredTodos("todos");  
        storedLocalCompletedTodos[userId] = completedTodos;
    localStorage.setItem("completedTodo", JSON.stringify(storedLocalCompletedTodos));  
  }, [todos, completedTodos, userId]);  

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
        <h2>Welcome back <span>{ username ? username :"user" }</span></h2>  
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
            userId,  
            email,  
            username,  
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