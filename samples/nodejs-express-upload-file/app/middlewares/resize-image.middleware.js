const sharp = require('sharp');

module.exports = (witdh = 100, height = 100) => {
    return async (req, res, next) => {
        const resize = (file) => sharp(file.path)
        .resize(witdh, height)
        .toFile(file.destination + `${witdh}x${height}_${file.filename}`);
        if (req.file) {
            await resize(req.file);
        }
        if (req.files) {
            await Promise.all(req.files.map(file => resize(file)));
        }

        next();
    }    
}
 