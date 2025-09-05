import { useState } from 'react';
import moment from 'moment';
import "../css/todo.css";

// 부모로부터 todoItem 상태와 업데이트 함수를 props로 받습니다.
function Todo({ selectedDate, todoItem, setTodoItem }) {
  const [newtodo, setNewText] = useState("");
  
  const formattedDate = moment(selectedDate).format('YYYY-MM-DD');
  const todosForSelectedDate = todoItem[formattedDate];

  const addTodo = () => {
    if (!newtodo.trim()) return;
    
    const newTodoItems = { ...todoItem };
    
    if (!newTodoItems[formattedDate]) {
      newTodoItems[formattedDate] = [];
    }

    newTodoItems[formattedDate] = [
      ...newTodoItems[formattedDate], 
      { text: newtodo, done: false }
    ];
    setTodoItem(newTodoItems);
    setNewText("");
  };

  const handleCheck = (i) => {
    const newTodoItems = { ...todoItem };
    if (newTodoItems[formattedDate]) {
      newTodoItems[formattedDate][i].done = !newTodoItems[formattedDate][i].done;
      setTodoItem(newTodoItems);
    }
  };

  return (
    <div className="todo-wrap">
      <h2>TO DO LIST</h2>
      <div className="todo-list">
        {todosForSelectedDate && todosForSelectedDate.map((item, index) => (
          <div className="todo-item" key={index}>
            <span style={{ textDecoration: item.done ? "line-through" : "none" }}>
              {item.text}
            </span>
            <input
              type="checkbox"
              className='check'
              checked={item.done}
              onChange={() => handleCheck(index)}
            />
          </div>
        ))}
        <div className="todo-add-wrap">
          <p>할 일 추가</p>
          <div className="todo-add">
            <input
              className='todo-add-input'
              type="text"
              value={newtodo}
              onChange={(e) => setNewText(e.target.value)}
            />
            <button className='todo-btn' onClick={addTodo}>추가</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Todo;