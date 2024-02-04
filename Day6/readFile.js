// Import Fs for reading files
const fs = require('fs');

 function readFileTxt (filePath){
   // return a promise with two arguments(resolve & reject)
   return new Promise((resolve,reject)=>{
      // Read file from filePath using Fs.readFile
      fs.readFile(filePath,'utf-8',(err,data)=>{
         // Start a condition to check if there an error or not
         if(err){
            reject(err);
         }else{
            resolve(data);
         }
      });
   });
};

// Export our function to use it in another file.
module.exports = readFileTxt;