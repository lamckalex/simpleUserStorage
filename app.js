import UserStorage from './classes/userStorage.js'
import express from 'express'
const port = 3000

var userStorage;

// Check if user exists, if they don't respond with a 404
function userExists(userID){
    if(userStorage.userExists(userID)){
        return true;
    } else {
        var message = 'Could not find user ' + userID;
        console.log(message);
        res.status(404).send(message);
        return false;
    }
}

function app(){
    userStorage = new UserStorage();
    
    const app = express()
    app.use(express.json()) 

    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`)
    })

    //Returns a count for how many users exist
    app.get('/userCount', function(req, res){
        const users = userStorage.getUsers();
        res.status(200).send(''+users.length);
    })

    //Create a new user
    app.post('/user', function (req, res) {
        res.send(userStorage.register())
    })

    //Get data for a user
    app.get('/userData', function (req, res) {
        let query = req.query;
        let userID = query.userID;
        console.log('Fetching data for ' + userID)
        if(userExists(userID)){
            res.send(userStorage.getData(userID))
        }
    })

    //Set data for a user
    app.post('/userData', function (req, res) {
        let query = req.query;
        let userID = query.userID;

        if(userExists(userID)){
            userStorage.setData(userID, req.body)
            var message = 'Stored data for ' + userID;
            console.log(message);
            res.send(message)
        }
    })
}

app();