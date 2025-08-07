import { useSelector } from 'react-redux';
import WeatherWidget from '../External/WeatherWidget';
import ClockWidget from '../External/ClockWidget';
import './Header.css';

const Header = () => {
  const { weather, time, loading } = useSelector(state => state.externalData);

  return (
    <header className="header">
      <div className="header-left">
        <h1>BPM Todo App</h1>
      </div>
      <div className="header-right">
        <div className="widgets">
          <ClockWidget time={time} loading={loading} />
          <WeatherWidget weather={weather} loading={loading} />
        </div>
      </div>
    </header>
  );
};

export default Header;
