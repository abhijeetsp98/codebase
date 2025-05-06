import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { useState, useEffect } from 'react';
import AddTask from './Task/AddTask';
import CompletedTask from './Task/CompletedTask';
import Sidebar from './components/Sidebar';
import Register from './components/Register';
import Login from './components/Login';
import AddDish from './Dish/AddDish';
import DishList from './Dish/DishList';
import ChefList from './Chef/ChefList';
import TaskList from './Task/TaskList';
import UserList from './User/UserList';
import LabourList from './Labour/LabourList';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('');

  // Check if the user is logged in on page load
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decode JWT to get user info
      setUserName(decodedToken.name); // Assuming the name is part of the JWT payload
    }
  }, []);

  // Log out the user and clear the token
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUserName('');
  };

  const route = createBrowserRouter([
    {
      path: '/',
      element: <TaskList/>,
    },
    //labour
    {
      path: '/userManagement',
      element: <LabourList/>,
    },
    //cred
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/register',
      element: <Register />,
    },
    {
      path: '/allusers',
      element: <UserList />,
    },
    // Dish
    {
      path : '/alldish',
      element: <DishList/>
    },
    {
      path: '/adddish',
      element: <AddDish />,
    },
    // Chef
    {
      path : '/allchef',
      element: <ChefList/>
    },
    {
      path: '/adddish',
      element: <AddDish />,
    },
    // Task
    {
      path: '/alltask',
      element: <TaskList/>,
    },
    {
      path: '/addtask',
      element: <AddTask />,
    },
    {
      path: '/completedtask',
      element: <CompletedTask />,
    },
    
  ]);

  return (
    <div className="App">
      <Sidebar />
      <div className="dashboard--content">
        <RouterProvider router={route} />
      </div>

      {/* Header - Login/Register or User Profile */}
      <div className="header">
        <div className="header-content">
          {isAuthenticated ? (
            <div className="user-info">
              <span>Hello, {userName}</span>
              <button onClick={handleLogout} className="logout-btn">Logout</button>
            </div>
          ) : (
            <div className="auth-buttons">
              <button className="login-btn" onClick={() => window.location.href = '/login'}>
                Login
              </button>
              <button className="register-btn" onClick={() => window.location.href = '/register'}>
                Register
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
