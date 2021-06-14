const Column = require('./../column.js');

let Schema = class {
    constructor() {
        this.SchemaName = 'useradmin';
        this.Description = 'Модуль администрирования пользователей';
    }
};

let TableList = class {
    constructor() {
        this.TableName = 'tableList';
    }
    columnList_get() {
        let columnList = [];
        columnList[0] = {
            columnname: 'name',
            datatype: 'text',
            allownull: false
        };
        columnList[1] = {
            columnname: 'tablename',
            datatype: 'text',
            allownull: false,
            unique: true
        };
        columnList[2] = {
            columnname: 'description',
            datatype: 'text',
        };
        columnList[3] = {
            columnname: 'parent',
            datatype: 'bigint',
        };
        //Тип таблицы: Документ(document), Справочник(dictionary)
        columnList[4] = {
            columnname: 'type',
            datatype: 'text',
        };
        return columnList;
    }
};

let СolumnList = class {
    constructor() {
        this.TableName = 'columnList';
    }
    columnList_get() {
        let columnList = [];
        columnList[0] = {
            columnname: 'name',
            datatype: 'text',
            allownull: false
        };
        columnList[1] = {
            columnname: 'columnname',
            datatype: 'text',
            allownull: false
        };
        columnList[2] = {
            columnname: 'datatype',
            datatype: 'text',
            allownull: false
        };
        columnList[3] = {
            columnname: 'description',
            datatype: 'text',
        };
        columnList[4] = {
            columnname: 'tableID',
            datatype: 'bigserial',
            allownull: false,
            references: 'tablelist (id)'
        };
        return columnList;
    }
};

module.exports = {
    Schema,
    TableList,
    СolumnList
};