const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Temporary storage for files before uploading to Cloudinary
module.exports = upload;
