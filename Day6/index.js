//Import Our Functions
const processFiles = require('./processFiles');
const readFileTxt = require('./readFile')
const writeFileTxt = require('./writeFile')
async function main() {
   // Handling Errors using try&catch
    try {
      console.log("########## ProcessFiles ##########");
       await processFiles(['./test1.txt','./test2.txt']);
       console.log('All files processed successfully');
       console.log("########## Writing file ##########");
       await writeFileTxt('./test.txt','My Textyyyy')
       console.log('The file has been writing successfully');
       console.log("########## Reading File ##########");
       const reading = await readFileTxt('./test.txt')
       console.log("The file has been reading successfully");
       console.log(`Content of our file : ${reading}`)

    } catch (error) {
       console.error(`An error occurred: ${error.message}`);
    }
   }


   
main();