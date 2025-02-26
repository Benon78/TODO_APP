/** @format */

import "./TodoItems.css";
import { useOutletContext } from "react-router-dom";
import Empty from "../../../assets/Images/Empty.png";
import { FaUndo, FaTrashAlt } from "react-icons/fa";
function CompletedTodos() {
  const { deleteCompletedTodo, completedTodos, undoTodo } = useOutletContext();
  return (
    <div className="completed-container">
      <h3>Completed Task</h3>
      {completedTodos.length > 0 ? (
        <div className="todo-list">
          {completedTodos.map((todo) => (
            <div key={todo.id} className="todo-item">
              <h4>{todo.tittle}</h4>
              <p>{todo.description}</p>
              <div className="todo-actions">
              <button id="complete" aria-label={`Undo ${todo.tittle}`} onClick={() => undoTodo(todo.id)}>
                  <FaUndo className="icon" /> Undo
                </button>
                <button id="delete" aria-label={`Delete ${todo.tittle}`} onClick={() => deleteCompletedTodo(todo.id)}>
                  <FaTrashAlt className="icon" /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-container">
          <img src={Empty} alt="empty image" />
          <p>No complete task available</p>
        </div>
      )}
    </div>
  );
}

export default CompletedTodos;
