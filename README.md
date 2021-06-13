# simpleUserStorage

Goal here is to create a simple user storage that writes to a file locally

Written in Node.js using Express

# Setup
Install the project dependencies: 
```
npm install
```

#### Run the script
```
node app.js
```


Default Port is 3000, and default file that it's writing to is db.json

# Endpoints

## Create User
```
post /user
```
Creates a new User and returns the UUID

## Submit User Data
```
post /userData
```
Query Params:
```
userID: {userID}
```
Body
```
{data to store}
```

## Get User Data
```
get /userData
```
Query Params:
```
userID: {userID}
```

## Get User Count
```
get /userCount
```
Returns User Count
