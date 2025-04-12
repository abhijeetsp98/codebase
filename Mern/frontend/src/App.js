import './App.css';
import {RouterProvider, createBrowserRouter} from "react-router-dom"
import User from  './getuser/User';
import AddUser from './adduser/AddUser';
import Sidebar from './components/Sidebar';
import { Content } from './components/Content';
import { Profile } from './components/Profile';

function App() {
  const route = createBrowserRouter([
    {
      path : "/",
      element : <User/>,
    },
    {
      path : "/add",
      element : <AddUser/>
    }
  ]);
  return (
    <div className="App">
        <Sidebar/>
        <div className='dashboard--content'>
          <Content/>
          <Profile/>
          <RouterProvider router={route}></RouterProvider>
        </div>
        
    </div>
  );
}

export default App;
