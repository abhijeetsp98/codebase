# Render - Backend
1. Login to render
2. Create a database in atlas.
    1. Create database user under <database Access> section of mongodb atlas and provide the required permission. 
    2. Once done add access to it under <Network Access> section of mongodb.
3. Once everything is done now is the time to connect to DB if cluster is made successfully.
4. copy the connection string like mentioned below
    TEMPLATE : mongodb+srv://<db_username>:<db_password>@cluster0.mgceyfi.mongodb.net/
    EXAMPLE : mongodb+srv://test_mern:ECkbQkOx74sDn2Ka@cluster0.mgceyfi.mongodb.net/
5. Once we are able to connect to DB then you can make sure it's running by checking the API using postman.
6. We  will get the url from render (https://codebase-7m9a.onrender.com)
7. Just run sample get URL using postman like (https://codebase-7m9a.onrender.com/api/users)
8. That's all is required to be done.


# Netlify - Frontend
1. Just run the 'npm run build' command and observing the build folder getting generated.
2. Once <build> folder is generated then simply drag and drop it over the netlify.
3. That's all is required for frontend just start using the website after this.