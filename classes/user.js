import { v4 as uuidv4 } from 'uuid';

export default class User {
    id;
    
    constructor(){
        this.id = uuidv4();
    }
}