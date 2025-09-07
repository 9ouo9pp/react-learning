import { useState } from 'react';
import Todo from './component/todo';
import MyCalendar from './component/MyCalendar';
import './css/calendar.css';
import Star from './component/Star';
import catImage from './img/cat.png';

function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // todoItem 상태를 App 컴포넌트로 옮겼습니다.
  const [todoItem, setTodoItem] = useState({
    '2025-09-05': [
      { text: "1번 할 일", done: false }, 
      { text: "2번 할 일", done: false },
      { text: "3번 할 일", done: false }
    ], 
    '2025-09-10': [
      { text: "4번 할 일", done: false }, 
      { text: "5번 할 일", done: false },
      { text: "6번 할 일", done: false }
    ]
  });

  const handleSelectSlot = (slotInfo) => {
    setSelectedDate(slotInfo.start);
  };
  
  const handleNavigate = (newDate) => {
    setSelectedDate(newDate);
    setCurrentMonth(newDate.getMonth() + 1);
    setCurrentYear(newDate.getFullYear());
  };
  
  // todoItem 객체를 캘린더 이벤트 배열로 변환합니다.
  const myEventsList = Object.entries(todoItem).map(([date, todos]) => {
    // 1. todos 배열에서 text만 뽑아내서 새로운 배열을 만듭니다.
    const title = todos.map(todo => todo.text).join('\n');
    
    // 2. 날짜와 합쳐진 제목을 가진 이벤트 객체를 반환합니다.
    return {
      start: new Date(date),
      end: new Date(date),
      title: title
    };
  });

  return (
    <div className='wrap'>
      <Star />
      <h1>{currentYear}<span>{monthNames[currentMonth - 1]}</span></h1>
      {/* <h3>{currentMonth}</h3> */}
      <div className="content">
        <MyCalendar 
            date={selectedDate}
            onNavigate={handleNavigate}
            onSelectSlot={handleSelectSlot}
            events={myEventsList} // 동적으로 생성된 이벤트 목록을 전달합니다.
        />
        <Todo selectedDate={selectedDate} todoItem={todoItem} setTodoItem={setTodoItem}/>
        <div className="cat">
          <img src={catImage} alt="cat" />
          <img src={catImage} alt="cat" />
          <img src={catImage} alt="cat" />
        </div>
      </div>
    </div>
  );
}

export default App;