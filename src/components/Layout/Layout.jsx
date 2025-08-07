import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Header from "./Header";
import Sidebar from "./Sidebar";
import TodoList from "../Todo/TodoList";
import {
  fetchWeatherRequest,
  fetchTimeRequest,
} from "../../store/slices/externalDataSlice";
import "./Layout.css";

const Layout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch external data on component mount
    dispatch(fetchWeatherRequest());
    dispatch(fetchTimeRequest());

    // Set up intervals to refresh data
    const weatherInterval = setInterval(() => {
      dispatch(fetchWeatherRequest());
    }, 600000); // 10 minutes

    const timeInterval = setInterval(() => {
      dispatch(fetchTimeRequest());
    }, 60000); // 1 minute

    return () => {
      clearInterval(weatherInterval);
      clearInterval(timeInterval);
    };
  }, [dispatch]);

  return (
    <div className="layout">
      <Header />
      <div className="layout-body">
        <Sidebar />
        <main className="main-content">
          <TodoList />
        </main>
      </div>
    </div>
  );
};

export default Layout;
