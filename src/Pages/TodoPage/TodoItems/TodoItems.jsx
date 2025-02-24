import "./TodoItems.css";  
import { useOutletContext } from "react-router-dom";  
import { useState } from "react";  
import { v4 as uniqueId } from "uuid";  
import { toast } from "react-toastify";  
import { FaTrashAlt, FaEdit } from "react-icons/fa";  
import Empty from "../../../assets/Images/Empty.png";  

function TodoItems() {  
  const { todos, addTodo, completeTodo, deleteTodo, editTodo } = useOutletContext();  
  const [tittle, setTittle] = useState("");  
  const [description, setDescription] = useState("");  
  const [editId, setEditId] = useState(null);  
  const [editTittle, setEditTittle] = useState("");  
  const [editDescription, setEditDescription] = useState("");  
  const [isEditing, setIsEditing] = useState(false);  

  const handleSubmit = (e) => {  
    e.preventDefault();  
    if (!tittle || !description) {  
      return toast.error("Please enter both title and description");  
    }  
    const newTodo = {  
      id: uniqueId(),  
      tittle,  
      description,  
      isCompleted: false,  
    };  
    addTodo(newTodo);  
    setTittle("");  
    setDescription("");  
  };  

  const handleEditTodo = (id) => {  
    const selectedTodo = todos.find((todo) => todo.id === id);  
    setEditId(id);  
    setEditTittle(selectedTodo.tittle);  
    setEditDescription(selectedTodo.description);  
    setIsEditing(true);  
    toast.info("Edit Todo");  
  };  

  const handleEditSubmit = (e) => {  
    e.preventDefault();  
    if (!editTittle || !editDescription) {  
      return toast.error("Please enter both title and description");  
    }  
    const updatedTodo = {  
      id: editId,  
      tittle: editTittle,  
      description: editDescription,  
      isCompleted: false,  
    };  
    editTodo(editId, updatedTodo);  
    // Clear edit state  
    resetEditState();  
  };  

  const resetEditState = () => {  
    setEditId(null);  
    setIsEditing(false);  
    setEditTittle("");  
    setEditDescription("");  
  };  

  return (  
    <>  
      <div className="todo-list-container">  
        <form className="form-container" onSubmit={handleSubmit}>  
          <input  
            type="text"  
            placeholder="Title"  
            value={tittle}  
            onChange={(e) => setTittle(e.target.value)}  
          />  
          {/* <input  
            type="text"  
            placeholder="Description"  
            value={description}  
            onChange={(e) => setDescription(e.target.value)}  
          />   */}
          <textarea
              type="text"  
               placeholder="Description"
               rows='4'
                cols='30'  
              value={description}  
              onChange={(e) => setDescription(e.target.value)} 
          />
          <button type="submit">Add Todo</button>  
        </form>  
        <h3>Task list</h3>  
        {todos.length > 0 ? (  
          <div className="todo-list">  
            {todos.map((todo) => (  
              <div key={todo.id} className="todo-item">  
                <h4>{todo.tittle}</h4>  
                <p>{todo.description}</p>  
                <div className="todo-actions">  
                  <button id="complete" onClick={() => completeTodo(todo.id)}>  
                    Complete  
                  </button>  
                  <button id="edit" onClick={() => handleEditTodo(todo.id)}>  
                    <FaEdit className="icon" />  
                    Edit  
                  </button>  
                  <button id="delete" onClick={() => deleteTodo(todo.id)}>  
                    <FaTrashAlt className="icon" />  
                    Delete  
                  </button>  
                </div>  
              </div>  
            ))}  
          </div>  
        ) : (  
          <div className="empty-container">  
            <img src={Empty} alt="empty image" />  
            <p>No task available</p>  
          </div>  
        )}  
      </div>  
      {isEditing && (  
        <div className="popup-edit-container">  
          <div className="overlay">
             <h4>Edit Todo</h4>
            <button type="button" id="close" onClick={resetEditState}>
              X
            </button>
          </div>
          <form onSubmit={handleEditSubmit}>  
            <input  
              type="text"  
              placeholder="Title"  
              value={editTittle}  
              onChange={(e) => setEditTittle(e.target.value)}  
            />  
            {/* <input  
              type="text"  
              placeholder="Description"  
              value={editDescription}  
              onChange={(e) => setEditDescription(e.target.value)}  
            />   */}
            < textarea 
              type="text"  
              placeholder="Description"  
              cols='50'
              rows='5'

              value={editDescription}  
              onChange={(e) => setEditDescription(e.target.value)} 
               />
            <div className="todo-actions">  
              <button id="save" type="submit">Save</button>  
              <button type="button" id="cancel" onClick={resetEditState}>Cancel</button>  
            </div>  
          </form>  
        </div>  
      )}  
    </>  
  );  
}  

export default TodoItems;




