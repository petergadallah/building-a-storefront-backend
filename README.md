# install node_modules
type in command:

```npm i```

# Create the .env file
## for example:

POSTGRES_HOST=127.0.0.1

POSTGRES_DB=newdatabase

POSTGRES_USER=postgres

POSTGRES_PORT=5432

POSTGRES_PASSWORD= 111

POSTGRES_TEST_DB=newdatabase2

ENV=dev

PORT=3800

BCRYPT_PASSWORD=petergadallah

SALT_ROUNDS=10

TOKEN_SECRET=peter123

# The database
## database port
the database works at the default port 5432
## First, create the user and the password
in your sql browser type this command:

```CREATE USER postgres WITH PASSWORD '111';```
## Then, setup the databases
1. Open sql with the Username = postgres and password= 111
1. create 2 databases (dev database and test database)
    -  type this command to setup the dev database

        ```CREATE DATABASE newdatabase;```
    -  type this command to setup the test database
    
        ```CREATE DATABASE newdatabase2;```

## Connect to the database
to connect to the database (dev database) type this command

```\c newdatabase```

# The backend server
The backend server works at port 3800
# Migrating tables
You must migrate up tables using the command
```db-migrate up```
# connecting to the backend server
type in command:

```npm run start```

