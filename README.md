# user-management-backend

Certainly! Here's an example of the API documentation for the user management backend system using Express.js and MongoDB:

User Management API Documentation
This API allows users to register an account and login using their email and password.

Base URL
http://localhost:3000

Endpoints
Register User
Registers a new user account.

Endpoint: POST /register
Request Body:
json
 
{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "password": "example_password"
}
Response (Success):
Status Code: 201 (Created)
Body:
json
 
{
  "message": "User registered successfully"
}
Response (Error - Email Already Registered):
Status Code: 400 (Bad Request)
Body:
json
{
  "message": "Email is already registered"
}
User Login
Logs in a user with their email and password.

Endpoint: POST /login
Request Body:
json
 
{
  "email": "johndoe@example.com",
  "password": "example_password"
}
Response (Success):
Status Code: 200 (OK)
Body:
json
 
{
  "token": "example_token"
}
Response (Error - Authentication Failed):
Status Code: 401 (Unauthorized)
Body:
json
 
{
  "message": "Authentication failed"
}
Error Handling
The API provides appropriate error responses for common error scenarios:

400 (Bad Request): Returned when the request body is missing or invalid.
401 (Unauthorized): Returned when authentication fails during login.
500 (Internal Server Error): Returned when an unexpected error occurs on the server.
