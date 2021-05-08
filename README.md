# Simple CRUD API

## Link to API
[App](https://whispering-castle-95687.herokuapp.com/)

## JSON Data Input Format
Only JSON Data input is recognized. Multipart Form input or Urlencoded input are not recognized.  
{  
&nbsp;&nbsp;&nbsp;&nbsp;"name": "owner name",  
&nbsp;&nbsp;&nbsp;&nbsp;"email": "owner email",  
&nbsp;&nbsp;&nbsp;&nbsp;"country": "owner country"  
}

## JSON Data Output Format
{  
&nbsp;&nbsp;&nbsp;&nbsp;"message": "success" || "error message",  
&nbsp;&nbsp;&nbsp;&nbsp;"data": result data object || "null" if error  
}

### Sample result data object
{  
&nbsp;&nbsp;&nbsp;&nbsp;"_id": "6096bafe552f499d7c8d2550",  
&nbsp;&nbsp;&nbsp;&nbsp;"name": "Dipo",  
&nbsp;&nbsp;&nbsp;&nbsp;"email": "dipo@zuri.com",  
&nbsp;&nbsp;&nbsp;&nbsp;"country": "Nigeria",  
&nbsp;&nbsp;&nbsp;&nbsp;"__v": 0  
}

## User Routes

1. Can view the Readme of the API (/) GET

2. Can create an entry (/api/data/create) POST  
All fields as in the model are required.  
On successful creation, the result data object has _id and __v fields in addition to the name, country and email fields

3. Can read all entries (/api/data) GET

4. Can read an entry with id (/api/data/:id) GET

5. Can update an entry with id (api/data/:id/update) PUT  
Any of the name, country or email fields can be specified for updating.  
Fields specified outside these three will not be added in the database.

6. Can delete an entry with id (api/data/:id/delete) DELETE

## Data Model

- Name (required)
- Email (required)
- Country (required)