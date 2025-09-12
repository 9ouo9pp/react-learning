import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const API_KEY = "44af970a6ed471603f90272996d45d18";

  // 비동기함수로 동작. 내부에서 await 함수로 api호출을 완료할 때까지 기다림
  const fetchWeather = async (e) => {
    // 폼이 제출될 때 페이지 새로고침을 막아줌
    e.preventDefault();
    // 로딩이 시작되는 상태로 바꿈
    setLoading(true);
    // 이전 검색에서 발생했던 오류를 제거
    setError("");
    // 이전 검색 결과를 지움
    setWeather(null);
    

    // 비동기 작업의 성공과 실패를 안전하게 처리
    // try: api호출과 같이 에러가 발생할 수 있는 코드를 적음
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=kr`;
      // await 키워드를 사용해 axios.get(url)로 api요청을 보낸 뒤 서버 응답이 올 때까지 기다림. 
      // 응답이 도착하면  response에 저장
      const response = await axios.get(url);
      // response에 저장한 데이터를 weather에 저장하여 날씨 정보를 보여줌
      setWeather(response.data);
    } catch (err) {
      setError("도시를 찾을 수 없습니다.");
    } finally {
      // try가 성공하든 안하든 실행되는 finally 로딩이 끝났으므로 무조건 로딩상태를 false로 바꿈
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <h1>날씨 앱</h1>
      <form onSubmit={fetchWeather}>
        <input 
          type="text" 
          value={city} 
          onChange={(e) => setCity(e.target.value)} 
          placeholder='도시 이름을 입력하세요' 
        />
        <button type='submit'>날씨 확인</button>
      </form>


      {/* 조건부 랜더링을 구현하는 방법 */}
      {/* 리엑트에서 retrun문 안에 {}을 사용하면 jsx안에 js코드를 사용할 수 있음 */}
      {/* loading상태가 true일 때만 작동 */}
      {loading && <p>날씨 정보 불러오는 중...</p>}
      {error && <p className='error-message'>{error}</p>}

      {weather && (
        <div className="weather-info">
          <h2>{weather.name}</h2>
          <p>온도: {Math.round(weather.main.temp)}°C</p>
          <p>날씨: {weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
}

export default App;