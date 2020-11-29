const service = require('./service');
const multer = require('multer');
const upload = multer();

module.exports = (app) => {
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });
    app.post('/data/save', upload.single('file'), service.saveFile);
    app.get('/data/get', service.getFile);
    app.get('/data/template', service.getTemplateFile);
};
