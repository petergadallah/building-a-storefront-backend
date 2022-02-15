# Schema of the database
after migrating tables you have 4 tables
1. migrations
2. users
3. orders
4. products
5. order_products


## users
it has 3 columns
|  number |  name            |         type        |
|---------|------------------|---------------------|
|    1    |id                | SERIAL PRIMARY KEY  |
|    2    |username          | VARCHAR (100)       |
|    3    |password_digest   | VARCHAR(250)        |


## products
it has 3 columns
|  number |  name            |         type        |
|---------|------------------|---------------------|
|    1    |id                | SERIAL PRIMARY KEY  |
|    2    |name              | VARCHAR (100)       |
|    3    |price             | integer             |


## orders
it has 3 columns
|  number |  name    |         type                 |
|---------|----------|------------------------------|
|    1    |id        | SERIAL PRIMARY KEY           |
|    2    |status    | VARCHAR(50)                  |
|    3    |user_id   | bigint REFERENCES users(id)  |             |


## order_products       
it has 4 columns  
|  number |  name      |         type                    |
|---------|------------|---------------------------------|
|    1    |id          | SERIAL PRIMARY KEY              |
|    2    |quantity    | integer                         |
|    3    |order_id    | bigint REFERENCES orders(id)    |             
|    4    |product_id  | bigint REFERENCES products(id)  |             
      

# RESTful routes
It is preferred to use routes using postman

## Users routes
### Signing up (Creating a new user)
#### Route
localhost:3800/createuser
#### HTTP request
POST request
#### Request body example
{
  "username": "peter",
  "password": "195318"
}


### Signing in (authentication)
#### Route
localhost:3800/authuser
#### HTTP request
POST request
#### Request body example
{
  "username": "peter",
  "password": "195318"
}

### Listing users 
#### Route
localhost:3800/indexuser
#### HTTP request
GET request

### Showing a user 
for example to show user with id=1
#### Route
localhost:3800/showuser/1
#### HTTP request
GET request

## Working on tables after signing in
AFTER AUTHENTICATION, YOU WILL GET A BEARER TOKEN.

Copy this token and paste it in authorization tab as bearer token

without pasting this token, you will not be able to update tables or creating new data.

## product routes
### listing all products 
#### Route
localhost:3800/indexproduct
#### HTTP request
GET request


### Creating a new products 
#### Route
localhost:3800/createproduct
#### HTTP request
POST request
#### Request body example
{
  "name": "new product",
  "price": "290"
}

### Updating a specific product 
for example to update product with id=3
#### Route
localhost:3800/updateproduct/3
#### HTTP request
POST request
#### Request body
{
  "name": "updated product",
  "price": "175"
}


### Showing a specific product 
for example to show product with id=2
#### Route
localhost:3800/showproduct/2
#### HTTP request
GET request


### Deleting a specific product 
for example to show product with id=3
#### Route
localhost:3800/deleteproduct/3
#### HTTP request
DELETE request


## order routes
### listing all orders 
#### Route
localhost:3800/indexorder
#### HTTP request
GET request


### Creating a new order 
#### Route
localhost:3800/createorder
#### HTTP request
POST request
#### Request body example
{
  "status": "new status",
  "user_id": "1"
}

NB: you should have a user with id=1


### Showing a specific order 
for example to show order with id=2
#### Route
localhost:3800/showorder/2
#### HTTP request
GET request


### Deleting a specific order 
for example to show order with id=3
#### Route
localhost:3800/deleteorder/3
#### HTTP request
DELETE request


### Updating a specific order 
for example to update order with id=3
#### Route
localhost:3800/updateorder/3
#### HTTP request
POST request
#### Request body
{
  "status": "updated status",
  "user_id": "2"
}


## order_product routes
### Creating data   
#### Aim
to create a new row with quantitiy= 125, productId=2, orderId=1
#### NB
1. You should have a row in order table with id= 1
1. you should have a row in product table with id=2
#### Route
localhost:3800/orders/1/products
#### HTTP request
POST request
#### HTTP request body example
{
  "quantity": "115",
  "productId": "2"
}



## Sorting
### To get username from the table 'users' in which id of the user= user_id of the order
#### Route
localhost:3800/join
#### HTTP request
GET request  


### To get name, price, order_id from the table 'products' in which id of the product = product_id of the order_products
#### Route
localhost:3800/userswithorders
#### HTTP request
Get request


### To get most expensive 5 products sorted by price in descending order 
#### Route
localhost:3800/mostexpensive
#### HTTP request
Get request
