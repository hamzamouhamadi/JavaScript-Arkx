const events = require('events');
const readline = require("readline")
const fs = require("fs")
const evenEmitter = new events();

let el = readline.createInterface({
    input : process.stdin,
    output : process.stdout
});


function loadDataFromFile() {
    try {
        const fileContents = fs.readFileSync('contacts.json');
        return JSON.parse(fileContents);
    } catch (err) {
        console.error('Error loading data from file:', err);
        return [];
    }
}
// Function to save data to file
function saveDataToFile(data) {
    try {
        fs.writeFileSync('contacts.json', JSON.stringify(data));
        console.log('Data saved to file');
    } catch (err) {
        console.error('Error saving data to file:', err);
    }
}

let data = loadDataFromFile();
// Start events
evenEmitter.on('add' , ({name,phone})=>{
    data.push({name,phone});
    saveDataToFile(data);
})

evenEmitter.on('search' , (name)=>{
    const contactFind = data.find(e=>e.name == name)
    if (contactFind) {
        console.log("we find your contactNumber :" , contactFind);
    }else{
        console.log("We don't have any number for this contact");
    }
})

evenEmitter.on('display' , ()=>{
    console.log(data);
})

// Start a function that return a promise whe resolved a question that we will 
function prompt(Que) {
    return new Promise((resolved)=>{
        el.question(Que,resolved)
    });
}

async function processQ() {
    while (true) {
        const userInput = await prompt("## Write ||add|| for adding contact ## \n## Write ||search|| for searching ##\n## Write ||display|| for displaying contacts ##\n## Write ||exit|| to get out of the program ##\n------>")

    switch (userInput.toLowerCase()) {
        case "add":
            const name = await prompt("Write your name :");
            const phone = await prompt("Write your phone :");
            evenEmitter.emit('add',{name,phone});
            break;
        case "search" :
            const searchName = await prompt("Write a name to get his numberContact :")
            evenEmitter.emit('search',searchName)
            break;
        case "display" :
            evenEmitter.emit('display')
            break;
        case "exit" :
            // process.on('beforeExit', () => {
            //     saveDataToFile(data);
            // });
            el.close();
                break;
        default :
            console.log("Invalid command try again");
    }
   }
}

processQ()