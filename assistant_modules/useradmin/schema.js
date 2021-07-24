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
        this.TableDescription = 'Таблица с информацией о таблицах схемы';

        this.Name = new Column.Name();
        this.Name.AllowNull = 'false';

        const TableName = new Column.TableName();
        TableName.AllowNull = 'false';

        const Description = new Column.Description();
        const Parent = new Column.Parent();
        const Type = new Column.Type();
    }
    columnList_get() { 
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
        TableID.References = `"useradmin"."tableList" (id)`;

        return [Name, ColumnName, DataType, Description, TableID];
    }
};

module.exports = {
    Schema,
    TableList,
    СolumnList
};