import './App.css';
import {RouterProvider, createBrowserRouter} from "react-router-dom"
import User from  './getuser/User';
import AddTask from './adduser/AddTask';
import AssignTask from './components/AssignTask';
import CompletedTask from './components/CompletedTask';
import Sidebar from './components/Sidebar';
import Content from './components/Content';
import Profile from './components/Profile';
import TaskDetail from './components/TaskDetail';

function App() {
  const route = createBrowserRouter([
    {
      path : "/",
      element : <AssignTask/>,
    },
    {
      path : "/assigntask",
      element : <AssignTask/>
    },
    {
      path : "/completedtask",
      element : <CompletedTask/>
    },
    {
      path: "/createtask",
      element: <AddTask />,
    },
    {
      path : '/tasks/:id',
      element: <TaskDetail />
    }
  ]);
  return (
    <div className="App">
        <Sidebar/>
        <div className='dashboard--content'>
          <RouterProvider router={route}></RouterProvider>
          {/* <Profile/> */}
        </div>
        
    </div>
  );
}

export default App;
