// var User = require("./classes/user.js");
import User from './user.js'
import fs from 'fs';

// Generic app that registers a user and stores and returns the data
const FILE_NAME = 'db.json';
export default class UserStorage{

    db;

    /**
     * Returns a UUID for the user
     */
    register(){
        const user = new User();
        this.db.set(user.id, {})
        this.writeToFile();
        return user.id;
    }

    /**
     * Stores data to memory and also writes it to file
     * @param {*} userID user UUID
     * @param {*} data data to store
     */
    setData(userID, data){
        this.db.set(userID, data);
        this.writeToFile();
    }

    /**
     * Gets data for the user
     * @param {*} userID user UUID
     * @returns returns data stored for the user
     */
    getData(userID){
        return this.db.get(userID);
    }

    /**
     * Gets all users UUID
     * @returns array of users UUID
     */
    getUsers(){
        let users = [];
        this.db.forEach((schedules, key)=>{
            users.push(key);
            console.log(key);
        })

        return users;
    }

    /**
     * Validates user exists
     * @param {*} userID User UUID
     * @returns whether the user UUID exists
     */
    userExists(userID){
        return this.db.has(userID);
    }

    /**
     * Takes the DB and stringifies and writes it to file
     */
    writeToFile(){
        fs.writeFile(FILE_NAME, JSON.stringify([...this.db]),  function(err){
            if(err){

            } else {
                console.log('File Updated')
            }
        })
    }

    constructor(){
        fs.readFile(FILE_NAME, (err, data) => {
            if(err){
                switch(err.code){
                    case 'ENOENT':
                        console.log('no db file');
                    break;
                }
            } else {
                JSON.parse(data).forEach((item)=>{
                    this.db.set(item[0], item[1])
                })
            }
        });

        this.db = new Map();
    }
}