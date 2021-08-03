const User = require('./User.js');
const Сlient = require('./Сlient.js');

module.exports = {
    ModuleName: 'dictionary',
    Description: 'Модуль справочников',
    FormList: ['User', 'Сlient'],
    User,
    Сlient
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