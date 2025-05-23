# User Registration API

## Endpoint
- `POST /users/register`
- `POST /users/login`

## Description
This endpoint allows new users to register by providing their personal information. It validates the input data, hashes the password, and creates a new user in the database. Upon successful registration, it returns a JSON Web Token (JWT) for authentication.

## Request Body
The request body must be a JSON object containing the following fields:

- `fullName`: An object containing:
  - `firstName`: A string representing the user's first name (minimum length: 3 characters).
  - `lastName`: A string representing the user's last name (minimum length: 3 characters).
- `email`: A string representing the user's email address (must be a valid email format and unique).
- `password`: A string representing the user's password (minimum length: 6 characters).

### Example Request
```json
{
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "securepassword"
}
```

## Responses
- **200 OK**: User registered successfully.
  - Response body:
    ```json
    {
      "message": "user registered successfully",
      "token": "JWT_TOKEN",
      "user": {
        "fullName": {
          "firstName": "John",
          "lastName": "Doe"
        },
        "email": "john.doe@example.com",
        "socketID": null,
        "createdAt": "2023-10-01T00:00:00.000Z",
        "updatedAt": "2023-10-01T00:00:00.000Z",
        "_id": "USER_ID"
      }
    }
    ```

- **400 Bad Request**: Validation errors occurred.
  - Response body:
    ```json
    {
      "error": [
        {
          "msg": "Invalid Email",
          "param": "email",
          "location": "body"
        }
      ]
    }
    ```

- **500 Internal Server Error**: An error occurred while processing the request.
  - Response body:
    ```json
    {
      "message": "Error message"
    }
    ``` 

## Status Codes
- `200`: Successful registration
- `400`: Validation errors
- `500`: Server errors

This documentation provides a comprehensive overview of the user registration endpoint, including the required data format and possible responses.


## 2. User Login

### Endpoint
`POST /users/login`

### Description
This endpoint allows existing users to log in by providing their email and password. It validates the credentials and returns a JSON Web Token (JWT) for authentication if the login is successful.

### Request Body
The request body must be a JSON object containing the following fields:

- `email`: A string representing the user's email address (must be a valid email format).
- `password`: A string representing the user's password (minimum length: 6 characters).

#### Example Request
```json
{
  "email": "john.doe@example.com",
  "password": "securepassword"
}
```

### Responses

#### Success
- **200 OK**: Login successful.
  - Response body:
    ```json
    {
      "message": "Login successful",
      "token": "JWT_TOKEN",
      "user": {
        "fullName": {
          "firstName": "John",
          "lastName": "Doe"
        },
        "email": "john.doe@example.com",
        "socketID": null,
        "createdAt": "2023-10-01T00:00:00.000Z",
        "updatedAt": "2023-10-01T00:00:00.000Z",
        "_id": "USER_ID"
      }
    }
    ```

#### Authentication Errors
- **401 Unauthorized**: Invalid email or password.
  - Response body:
    ```json
    {
      "message": "Invalid email or password"
    }
    ```

#### Server Errors
- **500 Internal Server Error**: An error occurred while processing the request.
  - Response body:
    ```json
    {
      "message": "Error message"
    }
    ```

---

## Status Codes
- `200`: Successful operation
- `400`: Validation errors
- `401`: Authentication errors
- `500`: Server errors

This documentation provides a comprehensive overview of the user registration and login endpoints, including the required data format and possible responses.

## 3. Get User Profile

### Endpoint
`GET /users/profile`

### Description
This endpoint retrieves the authenticated user's profile information. The request must include a valid JWT token in the cookie or `Authorization` header.

### Headers
- `Cookie`: `token=JWT_TOKEN`
- or
- `Authorization`: `Bearer JWT_TOKEN`

### Responses

#### Success
- **200 OK**: Returns the user's profile.
  - Response body:
    ```json
    {
      "user": {
        "_id": "USER_ID",
        "fullName": {
          "firstName": "John",
          "lastName": "Doe"
        },
        "email": "john.doe@example.com",
        "socketID": null,
        "createdAt": "2023-10-01T00:00:00.000Z",
        "updatedAt": "2023-10-01T00:00:00.000Z"
      }
    }
    ```

#### Errors
- **401 Unauthorized**: Missing or invalid token.
  - Response body:
    ```json
    {
      "message": "Unauthorized"
    }
    ```
- **404 Not Found**: User not found.
  - Response body:
    ```json
    {
      "message": "User not found"
    }
    ```
- **500 Internal Server Error**: An error occurred while processing the request.
  - Response body:
    ```json
    {
      "message": "Error message"
    }
    ```

---

## 4. User Logout

### Endpoint
`GET /users/logout`

### Description
This endpoint logs out the authenticated user by clearing the authentication cookie and blacklisting the JWT token. The request must include a valid JWT token in the cookie or `Authorization` header.

### Headers
- `Cookie`: `token=JWT_TOKEN`
- or
- `Authorization`: `Bearer JWT_TOKEN`

### Responses

#### Success
- **200 OK**: Logout successful.
  - Response body:
    ```json
    {
      "message": "Logout successful"
    }
    ```

#### Errors
- **401 Unauthorized**: Missing or invalid token.
  - Response body:
    ```json
    {
      "message": "Unauthorized"
    }
    ```
- **500 Internal Server Error**: An error occurred while processing the request.
  - Response body:
    ```json
    {
      "message": "Error message"
    }
    ```

---
---


## 5. Captain Registration

### Endpoint
`POST /captains/register`

### Description
This endpoint allows a new captain (driver) to register by providing personal and vehicle information. All fields are required and validated.

### Request Body
The request body must be a JSON object containing the following fields:

- `fullName`: An object containing:
  - `firstName`: String, minimum 3 characters.
  - `lastName`: String, minimum 3 characters.
- `email`: String, must be a valid and unique email address.
- `password`: String, minimum 6 characters.
- `vehicle`: An object containing:
  - `color`: String, minimum 3 characters.
  - `plate`: String, minimum 3 characters.
  - `capaCity`: Number, minimum 1.
  - `vchileType`: String, must be one of `"car"`, `"bike"`, or `"auto"`.

#### Example Request
```json
{
  "fullName": {
    "firstName": "Alice",
    "lastName": "Smith"
  },
  "email": "alice.smith@example.com",
  "password": "securepassword",
  "vehicle": {
    "color": "Red",
    "plate": "XYZ1234",
    "capaCity": 4,
    "vchileType": "car"
  }
}
```

### Responses

#### Success
- **200 OK**: Captain registered successfully.
  - Response body:
    ```json
    {
      "message": "Captain registered successfully",
      "token": "JWT_TOKEN",
      "captain": {
        "_id": "CAPTAIN_ID",
        "fullName": {
          "firstName": "Alice",
          "lastName": "Smith"
        },
        "email": "alice.smith@example.com",
        "vehicle": {
          "color": "Red",
          "plate": "XYZ1234",
          "capaCity": 4,
          "vchileType": "car"
        },
        "status": "inactive",
        "createdAt": "2023-10-01T00:00:00.000Z",
        "updatedAt": "2023-10-01T00:00:00.000Z"
      }
    }
    ```

#### Validation Errors
- **400 Bad Request**: Validation errors occurred.
  - Response body:
    ```json
    {
      "errors": [
        {
          "msg": "Invalid Email",
          "param": "email",
          "location": "body"
        }
      ]
    }
    ```

#### Duplicate Email
- **400 Bad Request**: Captain already exists.
  - Response body:
    ```json
    {
      "message": "Captain Already Exist"
    }
    ```

#### Server Errors
- **500 Internal Server Error**: An error occurred while processing the request.
  - Response body:
    ```json
    {
      "message": "Error message"
    }
    ```



# Captain Authentication API

## 6. Captain Login

### Endpoint
`POST /captains/login`

### Description
Allows a captain to log in using their email and password. On successful authentication, a JWT token is generated and set as a cookie for session management.

### Request Body
```json
{
  "email": "alice.smith@example.com",
  "password": "securepassword"
}
```

### Responses

#### Success
- **200 OK**
  ```json
  {
    "message": "Captain logged in successfully",
    "token": "JWT_TOKEN",
    "captain": {
      "_id": "CAPTAIN_ID",
      "fullName": {
        "firstName": "Alice",
        "lastName": "Smith"
      },
      "email": "alice.smith@example.com",
      "vehicle": {
        "color": "Red",
        "plate": "XYZ1234",
        "capaCity": 4,
        "vchileType": "car"
      },
      "status": "inactive",
      "createdAt": "2023-10-01T00:00:00.000Z",
      "updatedAt": "2023-10-01T00:00:00.000Z"
    }
  }
  ```

#### Authentication Errors
- **401 Unauthorized**
  ```json
  {
    "message": "Invalid email or password"
  }
  ```

#### Validation Errors
- **400 Bad Request**
  ```json
  {
    "errors": [
      {
        "msg": "Invalid Email",
        "param": "email",
        "location": "body"
      }
    ]
  }
  ```

#### Server Errors
- **500 Internal Server Error**
  ```json
  {
    "message": "Internal server error"
  }
  ```

---

## 7. Captain Profile

### Endpoint
`GET /captains/profile`

### Description
Retrieves the authenticated captain's profile. Requires a valid JWT token in the cookie or `Authorization` header.

### Headers
- `Cookie`: `token=JWT_TOKEN`
- or
- `Authorization`: `Bearer JWT_TOKEN`

### Responses

#### Success
- **200 OK**
  ```json
  {
    "captain": {
      "_id": "CAPTAIN_ID",
      "fullName": {
        "firstName": "Alice",
        "lastName": "Smith"
      },
      "email": "alice.smith@example.com",
      "vehicle": {
        "color": "Red",
        "plate": "XYZ1234",
        "capaCity": 4,
        "vchileType": "car"
      },
      "status": "inactive",
      "createdAt": "2023-10-01T00:00:00.000Z",
      "updatedAt": "2023-10-01T00:00:00.000Z"
    }
  }
  ```

#### Errors
- **401 Unauthorized**
  ```json
  {
    "message": "Unauthorized"
  }
  ```
- **404 Not Found**
  ```json
  {
    "message": "captain not found"
  }
  ```
- **500 Internal Server Error**
  ```json
  {
    "message": "Error message"
  }
  ```

---

## 8. Captain Logout

### Endpoint
`GET /captains/logout`

### Description
Logs out the authenticated captain by clearing the authentication cookie and blacklisting the JWT token. Requires a valid JWT token in the cookie or `Authorization` header.

### Headers
- `Cookie`: `token=JWT_TOKEN`
- or
- `Authorization`: `Bearer JWT_TOKEN`

### Responses

#### Success
- **200 OK**
  ```json
  {
    "message": "Logout Done"
  }
  ```

#### Errors
- **401 Unauthorized**
  ```json
  {
    "message": "Unauthorized"
  }
  ```
- **500 Internal Server Error**
  ```json
  {
    "message": "Error message"
  }
  ```

---

## Security Implementation

- **Token Blacklisting:**  
  On logout, the JWT token is stored in a blacklist ([`BlacklistToken`](Backend/models/blacklistToken.model.js)). All protected endpoints check this blacklist to prevent reuse of logged-out tokens.

- **Captain-Specific Authentication Middleware:**  
  The [`authCaptain`](Backend/middleware/auth.middle.js) middleware validates the JWT token, checks the blacklist, and ensures the request is made by an authenticated captain.

Refer to [`captain.router.js`](Backend/routers/captain.router.js) for route definitions and [`captain.controller.js`](Backend/controllers/captain.controller.js) for controller logic.