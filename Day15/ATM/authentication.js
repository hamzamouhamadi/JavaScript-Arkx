const fs = require('fs');
const readline = require("readline");
const processQ = require("./main")
function addUser(name) {
    // Read existing user data from users.json
    let userData = [];
    try {
        userData = JSON.parse(fs.readFileSync('user.json'));
    } catch (error) {
        console.log(error);
    }

    // Generate unique account ID
    const accountID = generateUniqueAccountID(userData);

    // Generate random 4-digit PIN
    const pin = generateRandomPIN();

    // Create new user object
    const newUser = {
        accountID: accountID,
        name: name,
        pin: pin,
        balance: 0, // Initial balance
        transactions: []
    };

    // Append new user to user data
    userData.push(newUser);

    // Write updated user data back to users.json
    fs.writeFileSync('user.json', JSON.stringify(userData, null, 2));

    console.log('New user added successfully!');
}

function generateUniqueAccountID(userData) {
    // If userData is empty, return 1 as the initial accountID
    if (userData.length === 0) {
        return 1;
    }

    // Find the maximum accountID and increment it by 1
    const maxAccountID = userData.reduce((maxID, user) => {
        return user.accountID > maxID ? user.accountID : maxID;
    }, 0);

    return maxAccountID + 1;
}

function generateRandomPIN() {
    // Generate random 4-digit PIN
    return Math.floor(1000 + Math.random() * 9000);
}

//addUser('ismail');


const rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout
})
function prompt(Que) {
    return new Promise((resolved)=>{
        rl.question(Que,resolved)
    });
}

async function Authentificated() {
    const id = await prompt("Enter your Account accountID :==> ");
    const pin = await prompt("Enter your Pin :==> ");
    let userData = [];
    try {
        userData = JSON.parse(fs.readFileSync('user.json'));
    } catch (error) {
        console.log(error.message);
    }
    const user = userData.find(e => e.accountID === id && e.pin === pin);
    if (user) {
        console.log(`Welcome ${user.name}`);
        return id; // Return the id upon successful authentication
    } else {
        console.log("Your account ID or pin are incorrect");
    }
}

module.exports = Authentificated;


