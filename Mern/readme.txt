#Backend

## Step 1 : (Install dependency)
1. Create a new server
 <npm init> create package name, with this command package.json will be created
2. Create a new file which will be the start point of server
 <index.js> 
3. Install dotenv, express and mongoos
    <npm i dotenv> this is to read the env variable from the file
    <npm i body-parser> this is used for middleware for express application
    <npm i express> this is just  a web framework
    <npm i mongoose> this is used to connect with mongoDB 
    <npm i nodemon> this will reload the application whenever we save the application while debugging

## Step 2 (Starting with DB)
1. import express,mongoose, dotenv and body-parser
2. create .env file having connection details like port and monogb URL
3. Install compass and connect to the database and save the connectiong stiring in the dotenv file.
4. Once compass is ready then create a new database by providing name and collection name to init
5. Save the newly created database name as a URL in .env file 
MONGO_URL = "mongodb://localhost:27017/mern"

# Step 3 (start connecting to db from index,js)
1. Initialize express application
const app = express();
app.use(bodyParser.json());
dotenv.config();
2. Initialize port for the application
const PORT = process.env.PORT || 7000;
const MONGOURL = process.env.MONGO_URL;
3. Connect to the DB
mongoose.connect(MONGOURL)
        .then(()=>{
            console.log("DB is connected")
            app.listen(PORT, ()=>{
                console.log(`Server is connected : ${PORT}`)
            });
        })
        .catch((error)=>console.log(error));

# Step 4 (Create folder for model and controller)
1. [Model] This is to manage structure of data and interaction with database
2. [controller] This is to handle request and generating the response
3. [Routes] This is to define endpoint of the application and map them to controller method.

Model - Schema
So in model folder we will be creating a userModel.js file which will have the information
about the schema of the data we want to store. We will export that to other component.

Controller - Database operations
We will import the schema and use it inside the controller like mentioned below
export const create = async(req, res) => {
    const newUser = new User(req.body);
    const {email} = newUser;
    const savedData = await newUser.save();
    res.status(200).json(savedData)
}

Routes - Handle CRUD API request
const route = express.Router();
route.post("/user", create)
we will add it as an middle ware in the index.js file


#How to add new backend API
1. Add route in the userRoute example (route.get("/users", getAllUsers))
2. Then add the function getAllUsers

Thats all for backend code just start the backend with "node index.js" command 







## Frontend
1. create a react application using the command "npx create-react-app <name_of_project>"
2. Start app with "npm start" command
3. Once done with creating a base react application will install bootstrap and configure the bootstrap.
4. For that go to public folder and open index.html file and past bootstrap CDN above to title tag of html page.
public-> index.html (import bootstrap CDN)

Creating custom react component
Once all component are connected properly now is the time to create the react component
1. Create a different folder with user name
2. create a jsx file in it and export that component and make sure that is included in app.js
3. User.jsx
import React from 'react'
import "./user.css"

const User = () => {
  return (
    <div className='userTable'>
        <table className='table table-bordered'>
            <thread>
                <tr>
                    <th scope="col">S. No</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Address</th>
                    <th scope="col">Action</th>
                </tr>
            </thread>
            <tbody>
                <tr>
                    <td>
                        <td>1</td>
                        <td>Abhijeet</td>
                        <td>Bangalore</td>
                        <td>Update/Delete</td>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
  )
}

export default User

# how to use css
1. Import css file in html code
2. create a html tag and specify the classname in it. like <div className='userTable'>
3. then use css tag to manipulate the css paramter of specified html tag
.userTable{
    width: 60%;
} 
.userTable table{  // here div is userTable and table is table tag inside div
    color: white; 
}

## How to add button in html of bootstrap
Just go bootstrap website and search for button and add whatever we are getting



## how to add font awesome icon
1. Search for npm font awesome and cdn link(past it below above title tag)
2. <button type="button" class="btn btn-danger"> <i class="fa-solid fa-trash"></i> </button>


## make website dynamic using axios 
1. Main intent here is to add conection between backend and Frontend
From frontend point of view we will be having below variable which will maintain current state of the variable
const [user, setUser] = useState([])

Here user is the variable name, setUser is the one which is use to assing value to it and useState() is the hook which is used to initialize the variable
const [users, setUsers] = useState([])
    useEffect(()=>{
        const fetchData = async () => {
            try{
                const response = await axios.get("http://localhost:8000/api/users")   
                setUsers(response.data)
            }catch(error){
                console.log("Error while fetching data :", error)
            }
        };
        fetchData() // in above line of code we have initialize the fetchData function and here we are calling it 
    },[]);  // By maintaining the [] array we are making sure that this function is called only once


// Once we have the data fetched from the database then we will render it using the map function of JS
<tbody>
    {users.map((user, index)=>{
        return (
            <tr>
                <td>{index + 1 }</td>
                <td>{user.name + 1 }</td>
            <tr>
        )
    })}

// We will import cors as well 



## React Router form 
So whenever we click on button we want to go to another website that has been handled using react router form 
To implement this we need to import RouterProvider and createBrowserRouter
And initialize this on the app.js file like below
function App() {
  const route = createBrowserRouter([
    {
      path : "/",                    // whenever we hit "/" in url i.e home then we want to render <User>
      element : <User/>,
    },
    {
      path : "/add",                 // whenever we hit "/add" in url i.e home then we want to render <AddUser> component
      element : <AddUser/>
    }
  ]);
  return (
    <div className="App">
        <RouterProvider router={route}></RouterProvider>
    </div>
  );
}


We will create a seperate react component for add user and when we hit /add then we will render that component

We will use link component for linking the page i.e whenever we click on a button it will redirect to different page 
import {Link} from "react-router-dom";
<Link type="button" class="btn btn-primary">
            Add User <i class="fa-solid fa-pen-to-square"></i>           
</Link>

