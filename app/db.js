//This file is used instead of DB for TESTING PURPOSE
const fs = require('fs');
const constant = require('./constant');

let DB = new Map();
const getFileByType = (type) => {
    return DB.get(type);
};

const getTemplateFileByName = (name) => {
    return fs.readFileSync('app/templates/'+constant.TEMPLATES[name]+'.csv');
};

const save = (file, type) => {
    DB.set(type, file);
};

module.exports = {
    getFileByType: getFileByType,
    getTemplateFileByName: getTemplateFileByName,
    save: save
};
//This file is used instead of DB for TESTING PURPOSE
