async function fetchUserData () { 
        try{
            //fetching data from an Api
        let data = await fetch('https://dummyjson.com/users')
        // Transfer data to json forma
        let result = await data.json();
        return result;
        // handling error if there any problem with fetching
        }catch(err){
            console.log("ERREUR :", err.message);
        }   
};

async function processUserData() {
    // get access to fetch data 
    const data = await fetchUserData();
    // We filter users with male gender
    function filterMale (){
        let dataF = data.users;
        let filtring = dataF.filter(e=>e.gender == 'male');
        return filtring;
    };
    console.log("Processed Users : ");
    // getting a liste of users with their ages.
    const mapUserData = () =>{
        data.users.map(({firstName,lastName,age})=> console.log(`-firstName : ${firstName} ${lastName}  , Age : ${age}`));
    }
    mapUserData();
    console.log('--------------------------------------------------------');
    // Calculate the totalAge of users who have male gender
    summarizeAge = ()=>{
        // getting access to data of filter function who we have filter users on it with their gender.
        const dataAge = filterMale();;
        let totalAge = dataAge.reduce((t,i)=> t + i.age,0)
        console.log(`Total age of users is: ${totalAge}`);
        return totalAge;
    }
    summarizeAge();
};
processUserData();
