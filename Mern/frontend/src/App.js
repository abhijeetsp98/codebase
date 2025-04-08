import './App.css';
import {RouterProvider, createBrowserRouter} from "react-router-dom"
import User from  './getuser/User';
import AddUser from './adduser/AddUser';

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
        <RouterProvider router={route}></RouterProvider>
    </div>
  );
}

export default App;
