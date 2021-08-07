const User = require('./User.js');
const Client = require('./Client.js');
const Material = require('./Material.js');
const Contractor = require('./Contractor.js');
const Storage = require('./Storage.js');

module.exports = {
    ModuleName: 'dictionary',
    Description: 'Модуль справочников',
    FormList: ['User', 'Client', 'Material', 'Contractor', 'Storage'],
    User,
    Client,
    Material,
    Contractor,
    Storage
}


/*let Module = class {
    constructor() {
        this.ModuleName = 'dictionary';
        this.Description = 'Модуль справочников';
    }

    get FormList() {
        return ['User','Сlient'];
    }
};

module.exports = {
    Module
};
*/