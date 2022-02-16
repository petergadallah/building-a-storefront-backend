
# Bcrypt
bcrypt is  used to create a hashed password

## we should install bcrypt 
1. ```npm i bcrypt```
2. ```import bcrypt from 'bcrypt'```  

## bcrypt has 2 main methods
### To create a hashed password
```bcrypt.hashSync(password + pepper , parseInt(saltround)) ```
### To validate a hashed password
```bcrypt.comparesync(password+ pepper , hashed_password) ``` 
this method returns true or false
#### example
```if (bcrypt.compareSync(password + pepper, user.password_digest)) { ```
```      return user;```
``` } ```

# Token
## we should install 
1. ```npm i jsonwebtoken```
2. ```import jwt from "jsonwebtoken";```
## jwt has 2 main methods
### to create a token
```jwt.sign( data which we want to convert into token , TOKEN_SECRET);```
#### example
```var token = jwt.sign( user , process.env.TOKEN_SECRET as string);```
### to validate using a token
``` jwt.verify(token, process.env.TOKEN_SECRET);```
#### example
using token as a middleware

```import { Request, Response } from "express";```

```import jwt from "jsonwebtoken";```

```const verifyAuthToken = async (req: Request, res: Response, next: Function) => {```

```  try {```

```    const authorizationHeader: any = req.headers.authorization;```

```    const token: any = authorizationHeader.split(" ")[1];```

```    jwt.verify(token, process.env.TOKEN_SECRET as string);```

```    next();```

```} catch (err) ```{

```    res.status(401);```

```    res.json("Access denied, invalid token");```

```    return;```

```  }```


```};```

```export default verifyAuthToken;```
