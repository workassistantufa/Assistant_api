const Column = require('./../column.js');

const City = class {
    constructor() {
        this.TableName = 'City';
    }
    columnList_get() {
        const Name = new Column.Name();
        //Name.AllowNull = 'false';
        const columnList = [Name];

        return columnList;
    }
};

const House = class {
    constructor() {
        this.TableName = 'House';
    }
    columnList_get() {
        let columnList = [];
        columnList[0] = {
            columnname: 'Name',
            datatype: 'text',
            allownull: false
        };
        return columnList;
    }
};

module.exports = {
    City
};