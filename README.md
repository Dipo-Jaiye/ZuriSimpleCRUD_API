# Simple CRUD API

## Link to API
[App](https://zurinode.herokuapp.com/)

## JSON Data Input Format
Only JSON Data input is recognized. Multipart Form input or Urlencoded input or other Content-Types are not recognized. 

When an unsupported type is sent in the request, a `"request body is empty"` error message will be returned.  

{  
&nbsp;&nbsp;&nbsp;&nbsp;"name": "owner name",  
&nbsp;&nbsp;&nbsp;&nbsp;"email": "owner email",  
&nbsp;&nbsp;&nbsp;&nbsp;"country": "owner country"  
}

## JSON Data Output Format
{  
&nbsp;&nbsp;&nbsp;&nbsp;"message": "success" || "error message",  
&nbsp;&nbsp;&nbsp;&nbsp;"data": `result data object` || `null` if error  
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
When any fields outside those specified are sent in the request, an error is returned.  
On successful creation, the result data object has _id and __v fields in addition to the name, country and email fields

3. Can read all entries (/api/data) GET  
A successful request will have an array of objects as the data

4. Can read an entry with id (/api/data/:id) GET  
A successful request has only one object as the data

5. Can update an entry with id (api/data/:id/update) PUT  
Any of the name, country or email fields can be specified for updating.  
Fields specified outside these three will not be added in the database and an error will be returned  
Successful requests will return the updated data in the result data object

6. Can delete an entry with id (api/data/:id/delete) DELETE  
On successful deletion, the result data object in the response will be `null`

## Data Model

- Name (required)
- Email (required)
- Country (required)

## Examples
### Example 1 (Create an entry)
POST (/api/data/create)  
{  
&nbsp;&nbsp;&nbsp;&nbsp;"name":"Dipo Jaiye",  
&nbsp;&nbsp;&nbsp;&nbsp;"email":"dipo@zuri.team",  
&nbsp;&nbsp;&nbsp;&nbsp;"country":"Guinea Bissau"  
}  

Response  
{  
&nbsp;&nbsp;&nbsp;&nbsp;"message":"success",  
&nbsp;&nbsp;&nbsp;&nbsp;"data": {  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"_id": "60999ebb9fa70a00158a0222",  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"name": "Dipo Jaiye",  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"email": "dipo@zuri.team",  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"country": "Guinea Bissau",  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"__v": 0  
&nbsp;&nbsp;&nbsp;&nbsp;}  
}  

### Example 2 (Read all entries)
GET (/api/data)

Response  
{  
&nbsp;&nbsp;&nbsp;&nbsp;"message": "success",  
&nbsp;&nbsp;&nbsp;&nbsp;"data": [  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"_id": "6096bafe552f499d7c8d2550",  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"name": "Dipo",  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"email": "dipo@zuri.com",  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"country": "Nigeria",  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"__v": 0  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"_id": "60999ebb9fa70a00158a0222",  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"name": "Dipo Jaiye",  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"email": "dipo@zuri.team",  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"country": "Guinea Bissau",  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"__v": 0  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"_id": "60995a62a3af21b92c56ece9",  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"name": "Musa",  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"email": "asd@ff.nt",  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"country": "Tanzania",  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"__v": 0  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}  
&nbsp;&nbsp;&nbsp;&nbsp;]  
}  

### Example 3 (Updating a resource)
PUT (/api/data/609991940ce7ad9a701d796b/update)  
{  
&nbsp;&nbsp;&nbsp;&nbsp;"email":"trent@i",  
&nbsp;&nbsp;&nbsp;&nbsp;"legacy":"codebase"  
}  

Response  
{  
&nbsp;&nbsp;&nbsp;&nbsp;"message": "field: legacy is not allowed; Invalid Email;",  
&nbsp;&nbsp;&nbsp;&nbsp;"data": null  
}  