import { useState } from 'react';
import './App.css';

function App() {

  let [todoItem, setTodoItem] = useState([
    {text: "1번 할 일", done: false},
    {text: "2번 할 일", done: false},
    {text: "3번 할 일", done: false}
  ]);

  // 체크리스트 이벤트 관리
  const handleCheck = (i) =>{
    const todoItemCopy = [...todoItem];
    // 토글 장치를 만들어줌
    todoItemCopy[i].done = !todoItemCopy[i].done
    // 상태를 갱신해줌
    setTodoItem(todoItemCopy);
  };

  return (
    <div className='wrap'>
      <div className="todo-wrap">

      <h2>TO DO LIST</h2>
      <div className="todo-list">
        {/* 중괄호를 사용해서 html에 내가 정의 한 내용을 넣을 수 있다.
        변수를 넣을 때는 중괄호 사용! */}
        {todoItem.map((item, index)=>(
          <div className="todo-item" key={index}>
            <span style={{ textDecoration: item.done ? "line-through" : "none"}}>
              {item.text}
            </span>
            <input 
            type="checkbox"
            className='check' 
            checked = {item.done}
            onChange={()=>handleCheck(index)}
            />
          </div>
        ))}
      </div>

      </div>
    </div>
  )
}

export default App
