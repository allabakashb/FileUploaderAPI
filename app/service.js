const db = require('./db');
const stream = require("stream");
const constant = require("./constant");

const getFile = (req, res) => {
    if (!req.query || !req.query.type) {
        res.status(400).send('Bad Request');
        return;
    }
    const fileContents = db.getFileByType(req.query.type).buffer;

    const readStream = new stream.PassThrough();
    readStream.end(fileContents);

    res.set('Content-disposition', 'attachment; filename=' + constant.TEMPLATES[req.query.type]+'.csv');
    res.set('Content-Type', 'text/csv');

    readStream.pipe(res);
};

const getTemplateFile = (req, res) => {
    if (!req.query || !req.query.name) {
        res.status(400).send('Bad Request');
        return;
    }
    const fileContents = Buffer.from(db.getTemplateFileByName(req.query.name), "base64");

    const readStream = new stream.PassThrough();
    readStream.end(fileContents);

    res.set('Content-disposition', 'attachment; filename=' + constant.TEMPLATES[req.query.name]+'.csv');
    res.set('Content-Type', 'text/csv');

    readStream.pipe(res);
};

const saveFile = (req, res) => {
    if (!req.query || !req.query.type) {
        res.status(400).send('Bad Request');
        return;
    }

    db.save(req.file, req.query.type);
    res.status(200).send({ status: "success" });
};

const checkFile = (req, res) => {
    if (!req.query || !req.query.name || !req.query.fileType) {
        res.status(400).send('Bad Request');
        return;
    }

    if (req.query.fileType === 'template') {
        res.status(200).send({ found: constant.TEMPLATES[req.query.fileType] !== null })
    } else {
        res.status(200).send({ found: db.getFileByType(req.query.name) != null });
    }
};

module.exports = {
  checkFile: checkFile,
  getFile: getFile,
  getTemplateFile: getTemplateFile,
  saveFile: saveFile
};
