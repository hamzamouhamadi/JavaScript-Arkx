const fs = require('fs');
const events = require("events")
const EventEmitter = new events();
const readline = require("readline");

const Authentificated = require('./authentication');

const rl = readline.createInterface({
    input : process.stdin,
    output: process.stdout
})
function prompt(Que) {
    return new Promise((resolved)=>{
        rl.question(Que,resolved)
    });
}

function getUserData() {
    try {
        const userData = JSON.parse(fs.readFileSync('user.json'));
        return userData;
    } catch (error) {
        console.error('Error reading user data:', error);
        return [];
    }
}

function write(userData) {
    try {
        fs.writeFileSync('user.json', JSON.stringify(userData, null, 2));
    } catch (error) {
        console.error('Error writing user data:', error);
    }
}
EventEmitter.on("CheckingBalance",(accountId)=>{
    const userData = getUserData();
    const user = userData.find(e=>e.accountID == accountId)
    if (user) {
        console.log(`Balance of ${user.name} is : ${user.balance}$`);
    }else{
        console.log("User not found");
    }
})
EventEmitter.on("WithdrawingMoney",({accountID , amount})=>{
    const userData = getUserData();
    const user = userData.find(u=>u.accountID == accountID)
    if (user) {
        if (user.balance >= amount) {
            user.balance -= amount ;
            user.transactions.push({type : "withdraw" , amount : amount , date : new Date() })
            write(userData);
            console.log(`Withdraw successfullt from ${user.name} with amount : ${amount}`);
        }else{
            console.log(`You just have ${user.balance}$ so you can't withdraw ${amount}$`);
        }
    }else{
        console.log("User not found");
    }
})
EventEmitter.on("DepositingMoney",({accountID , amount})=>{
    
    const userData = getUserData();
    const user = userData.find(u=>u.accountID == accountID)
    if (user) {
        user.balance += amount ;
        user.transactions.push({type : "deposit" , amount : amount , date : new Date() })
        write(userData);
        console.log(`Deposit successfullt from ${user.name} with amount : ${amount}`);
    }else{
        console.log("User not found");
    }
})
EventEmitter.on("ViewingTransaction",(accountId)=>{
    const userData = getUserData();
    const user = userData.find(u=>u.accountID == accountId)
    console.log(user.transactions);
})

while (Authentificated) {
    
    async function processQ() {
        let id = await Authentificated();
        const userInput = await prompt(" Write ||Check|| to see ur balance Or ||Dep|| to deposit Or ||Withd|| to withdraw Or ||SeeTran|| to see our transactions :");
        switch (userInput) {
            case "Check":
                EventEmitter.emit('CheckingBalance',id)
                break;
            case "Dep":
                let  amountDep = await prompt('Enter your amount : ');
                EventEmitter.emit('DepositingMoney',(id,amountDep))
                break;
            case "withd":
                let  amountWithd = await prompt('Enter your amount : ');
                EventEmitter.emit('WithdrawingMoney',(id,amountWithd))
                break;
            case "SeeTran":
                //let  ID = await prompt('Enter the AccountID');
                EventEmitter.emit('ViewingTransaction',id)
                break;
            
            default:
                break;
        }
    }
}



//function CheckingBalance(accountId) {}
//function DepositingMoney() {}
//function WithdrawingMoney() {}
//function ViewingTransaction(accountId) {}



// module.exports ={
//     CheckingBalance,
//     WithdrawingMoney,
//     DepositingMoney,
//     ViewingTransaction
// }

module.exports = processQ;