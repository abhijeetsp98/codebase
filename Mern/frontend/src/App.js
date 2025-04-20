import './App.css';
import {RouterProvider, createBrowserRouter} from "react-router-dom"
import User from  './getuser/User';
import AddTask from './adduser/AddTask';
import AssignTask from './components/AssignTask';
import CompletedTask from './components/CompletedTask';
import Sidebar from './components/Sidebar';
import Content from './components/Content';
import Profile from './components/Profile';
import Register from './components/Register';
import Login from './components/Login';

function App() {
  const route = createBrowserRouter([
    {
      path: "/",
      element: <AssignTask />,
    },
    {
      path: "/assigntask",
      element: <AssignTask />
    },
    {
      path: "/completedtask",
      element: <CompletedTask />
    },
    {
      path: "/createtask",
      element: <AddTask />,
    },
    {
      path: "/register",
      element: <Register />
    },
    {
      path: "/login",
      element: <Login />
    }
  ]);

  return (
    <div className="App">
      <Sidebar />
      <div className='dashboard--content'>
        <RouterProvider router={route} />
      </div>
    </div>
  );
}

export default App;