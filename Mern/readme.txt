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
1. 
