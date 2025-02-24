import "../TodoLayout/TodoLayout.css";
import { Link } from "react-router-dom";
function TodoItemsMessage() {
  return (
    <div className="todo-container">  
    <h3 className="welcome-message">Welcome to Your Todo List!</h3>  
    <p className="instruction-message">Ready to take control of your tasks? Click the button below to add your first todo.</p>  
    <Link to="addToDo" className="link-btn">  
        Add Todo 
    </Link>  
</div>  
  )
}

export default TodoItemsMessage