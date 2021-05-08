# Simple CRUD API

## Link to API
[App](https://abc.heroku.com)

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
## User Routes

1. Can view the Readme of the API (/) GET
2. Can create an entry (/api/data/create) POST
3. Can read all entries (/api/data) GET
4. Can read an entry with id (/api/data/:id) GET
5. Can update an entry with id (api/data/:id/update) PUT
6. Can delete an entry with id (api/data/:id/delete) DELETE

## Data Model

- Name (required)
- Email (required)
- Country (required)