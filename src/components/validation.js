`use strict`
const email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//Minimum eight characters, at least one uppercase letter, one lowercase letter and one number:

//from 10 to 100
const age = /^[1-9][0-9]$|^(100)$/;
//Alphanumeric string that may include _ and – having a length of 5 to 16 characters.
const username = /^[a-z0-9_-]{5,16}$/igm;

const validation = {
    email: (string) => email.test(string), 
    age: string => age.test(string), 
    username: string => username.test(string),    
}

export default validation;