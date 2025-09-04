import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { useState } from 'react';
import './css/calendar.css'

const MyCalendar = () => {
  // 현재 날짜
  const [date, setDate] = useState(new Date());
  // moment 라이브러리를 캘린더와 연결
  const localizer = momentLocalizer(moment);

  // 캘린더에 표시할 이벤트 목록
  const myEventsList = [
    {
      // 이벤트 시작 날짜
      start: new Date(2025, 8, 20),
      // 이벤트 끝 날짜
      end: new Date(2025, 8, 21),
      // 이벤트 제목
      title: "오늘의 할 일",
    }
  ]


  // 다음/이전 달 이동 핸들러
  // 'onNavigate'가 작동하면 라이브러리가 계산한 'newDate'값을 'handleNavigate'에 전달
  // 'newDate'는 라이브러리가 '월'을 기준으로 다음 달 혹은 이전 달의 시작 날짜를 자동으로 계산
  const handleNavigate = (newDate) => {
    setDate(newDate);
  }

  return(
    <div style={{height: '500px'}}>
      <Calendar
        // 날짜 처리 로직 연결
        localizer={localizer}
        // 이벤트 목록 전달
        events={myEventsList}
        // 현재 보여줄 날짜를 상태로 제어
        date={date}
        // 이전/ 다음달 핸들러 연결
        onNavigate={handleNavigate}
        // 이벤트 객체에서 시작날짜를 나타내는 속성 이름 지정
        startAccessor= "start"
        // 이벤트 객체에서 끝날짜를 나타내는 속성 이름 지정
        endAccessor= "end"
        style={
          {height: '500px', width: '500px'}
        }
      />
    </div>
  );
};

function App() {
  return (
    <div>
      <h1>리액트 캘린더</h1>
      <MyCalendar />
    </div>
  );
}

export default App;