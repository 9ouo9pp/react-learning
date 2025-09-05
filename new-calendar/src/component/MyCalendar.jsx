import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import '../css/calendar.css';

// events prop을 추가로 받아서 캘린더에 전달합니다.
const MyCalendar = ({ date, onNavigate, onSelectSlot, events }) => {
  const localizer = momentLocalizer(moment);

  return(
    <div className='calendar-wrap' style={{height: '500px'}}>
      <Calendar
        localizer={localizer}
        events={events} // props로 받은 이벤트 목록을 사용합니다.
        date={date}
        onNavigate={onNavigate}
        selectable={true} 
        onSelectSlot={onSelectSlot}
        startAccessor="start"
        endAccessor="end"
        style={{height: '500px'}}
      />
    </div>
  );
};

export default MyCalendar;