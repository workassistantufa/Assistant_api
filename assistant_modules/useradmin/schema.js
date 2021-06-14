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
        const Name = new Column.Name();
        Name.AllowNull = 'false';

        const TableName = new Column.TableName();
        TableName.AllowNull = 'false';

        const Description = new Column.Description();
        const Parent = new Column.Parent();
        const Type = new Column.Type();

        return [Name, TableName, Description, Parent, Type];
    }
};

let СolumnList = class {
    constructor() {
        this.TableName = 'columnList';
    }
    columnList_get() {
        const Name = new Column.Name();
        Name.AllowNull = 'false';

        const ColumnName = new Column.ColumnName();
        ColumnName.AllowNull = 'false';

        const DataType = new Column.DataType();
        DataType.AllowNull = 'false';

        const Description = new Column.Description();

        const TableID = new Column.TableID();
        TableID.AllowNull = 'false';
        TableID.References = 'tableList (id)';

        return [Name, ColumnName, DataType, Description, TableID];
    }
};

module.exports = {
    Schema,
    TableList,
    СolumnList
};