import {v4 as uuidv4} from 'uuid';

export function uuid_token(){
    let uuid = localStorage.getItem('UUID_TOKEN');
    if(!uuid){
        uuid = uuidv4();
        localStorage.setItem('UUID_TOKEN',uuid);
    }
    return uuid;
}