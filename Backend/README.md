# User Registration API

## Endpoint
`POST /users/register`

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