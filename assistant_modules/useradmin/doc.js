let Invoice = class {
    constructor() {
        this.TableName = 'Invoice';
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

let Dogovor = class {
    constructor() {
        this.TableName = 'Dogovor';
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
    Invoice,
    Dogovor
};