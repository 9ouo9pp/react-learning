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

  // 할 일 항목 삭제
  const removeTodo = (indexToRemove) => {
    // todoitem 복사본
    const newTodoItems = {...todoItem};

    if (newTodoItems[formattedDate]) {
      // filter를 사용해 삭제항목 제외 새로운 배열만듬
      const updateTodos = newTodoItems[formattedDate].filter((_, index) => index !== indexToRemove);
      newTodoItems[formattedDate] = updateTodos;
      // 변경된 상태로 업데이트
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
            <div className="todo-list-btns">
              {/* 체크 */}
              <input
                type="checkbox"
                className='check'
                checked={item.done}
                onChange={() => handleCheck(index)}
                />
              {/* 할 일 제거 */}
              <button className='todo-btn-delete' onClick={() => removeTodo(index)}>X</button>
            </div>
          </div>
        ))}
        <div className="todo-add-wrap">
          {/* <p>할 일 추가</p> */}
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