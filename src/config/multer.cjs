const multer 
 = require('multer');
const { resolve } = require('node:path')

module.exports = {
    storage: multer.diskStorage({
        destination: resolve(__dirname, '..','..','uploads'),
        filename: (_request, file, callback) => {
            const uniqueName = `${Date.now()}-${file.originalname}`
            return callback(null, uniqueName)
        }
    })
}



