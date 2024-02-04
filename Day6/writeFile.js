// Import Fs for writing files
const fs = require("fs");
// this function have two arguments filePath and content to write in the file.
function writeFileTxt(filePath,content){
   // return a promise with two arguments(resolve & reject)
   return new Promise((resolve,reject)=>{
      // Write file from filePath using Fs.writeFile
      fs.writeFile(filePath,content,'utf-8',(err)=>{
         // Start a condition to check if there an error or not
         if(err){
            console.log('Cannot write the file',err.message);
            reject(err)
         }else{
            resolve('File has been writing successfully')
         }
      })
   })
}

// Export our function to use it in another file.
module.exports = writeFileTxt;