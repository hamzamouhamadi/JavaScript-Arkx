const fs = require('fs').promises;
const path = require('path');

async function processFiles(filePaths) {
  for (let i = 0; i < filePaths.length; i++) {
    try {
      // Read the file
      let data = await fs.readFile(filePaths[i], 'utf8');
      // Manipulate the content
      // convert the content to uppercase and add a timestamp
      const currentDate = new Date();
      const fullDate = currentDate.toLocaleString(); // Full date and time as a string
      let manipulatedData = data.toUpperCase() + '\nTimestamp: ' + fullDate;
      // Get the base name of the file (excluding the directory)
      let baseName = path.basename(filePaths[i]);

      // Construct the new file name with the prefix and the original base name
      let newFileName = `new_${baseName}`;
      await fs.writeFile(newFileName, manipulatedData, { encoding: 'utf8' });
      console.log(`Processed file ${filePaths[i]} and wrote to ${newFileName}`);
    } catch (error) {
      console.error(`An error occurred while processing file ${filePaths[i]}: ${error.message}`);
    }
  }
}
// Export our function to use it in another file.
module.exports = processFiles;