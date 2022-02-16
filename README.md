# install node_modules
type in command:

npm i


# The database
## database port
the database works at the default port 5432
## First, create the user and the password
in your sql browser type this command:

CREATE USER postgres WITH PASSWORD '111';
## Then, setup the databases
1. Open sql with the Username = postgres and password= 111
1. create 2 databases (dev database and test database)
    -  type this command to setup the dev database

        CREATE DATABASE newdatabase;
    -  type this command to setup the test database
    
        CREATE DATABASE newdatabase2;

## Connect to the database
to connect to the database (dev database) type this command

\c newdatabase

# The backend server
The backend server works at port 3800
# Migrating tables
You must migrate up tables using the command
db-migrate up
# connecting to the backend server
type in command:

npm run start


# Bcrypt
bcrypt is  used to create a hashed password

## we should install bcrypt 
1. npm i bcrypt
2. import bcrypt from 'bcrypt'  

## bcrypt has 2 main methods
### To create a hashed password
```bcrypt.hashSync(password + pepper , parseInt(saltround)) ```
### To validate a hashed password
bcrypt.comparesync(password+ pepper , hashed_password) to validate a given hashed password)
this method returns true or false
#### example
if (bcrypt.compareSync(password + pepper, user.password_digest)) {
        return user;
}
