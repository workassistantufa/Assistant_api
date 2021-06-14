let City = class {
    constructor() {
        this.TableName = 'City';
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

let House = class {
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
    City,
    House
};