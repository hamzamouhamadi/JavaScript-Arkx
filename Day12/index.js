const readline = require('readline');
const fs = require('fs')
let userData = []
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function promptForContactDetails() {
    let userName;
    let phoneMe;
    rl.question('What is your name? ', (name) => {
        userName = name;
        console.log(`Your name is : ${userName}!`);
    
    rl.question('What is your phone number? ', (phoneNumber) => {
        phoneMe = phoneNumber;
        console.log(`Your phone number is : ${phoneMe}!`);
              
    userData.push({
        name: userName,
        phoneNumber: phoneMe
    });
    rl.question("Do you want to add more contacts (yes/no) ?",(answer)=>{
        if (answer.toLowerCase() == "yes") {
            promptForContactDetails();
        } else {
            // Convert the userData array to a JSON string
            const jsonString = JSON.stringify(userData, null,  2);
            
            // Write the JSON string to a file
            fs.writeFile('contacts.json', jsonString, (err) => {
                if (err) {
                    console.error(err);
                } else {
                    console.log('Contacts saved to contacts.json');
                }
            });
            
            search();
        }
    }) 
    
    });
    });
    
}

function search() {
    rl.question('Search for a contact from its name :', (nameS) => {
        const findContact = userData.filter(e => e.name == nameS);
        if (findContact) {
            console.log(`We find The contact :`,findContact);
        } else {
            console.log("the contact was not found");
        }
        rl.close();
    })
}
promptForContactDetails();


