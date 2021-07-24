const Column = require('./../column.js');
const SchemaName = 'useradmin';

const User = class {
    constructor({
        id = null,
        Name = null,
        Description = null
    } = {}) {
        this.id = id;
        this.Name = Name;
        this.Description = Description;
    }

    get ColumnList() {
        return ['id', 'Name', 'Description'];
    }
    get TableName(){
        return 'User';
    }
    get DicDescription(){
        return 'Справочник пользователей';
    }

    /*       this.TableName = 'User';
           this.TableDescription = 'Таблица с информацией о пользователях';

           this.id = new Column.id();
          if (!id) this.id.Value = id_getNEW({
               SchemaName,
               TableName: 'User'
           });
           else if (id <= 0) throw new Error("Ошибка: id <= 0");
           else this.id.Value = id;

           this.Name = new Column.Name();
           this.Name.Value = Name;

           this.Description = new Column.Description();
           this.Description.Value = Description;
     }
    */
    get id() {
        return this._id;
    }
    set id(value = 0) {
        this._id = new Column.id({
            Value: value
        });
    }

    get Name() {
        return this._Name;
    }
    set Name(value) {
        this._Name = new Column.Name({
            Value: value,
            AllowNull: 'false'
        });
    }
    get Description() {
        return this._Description;
    }
    set Description(value) {
        this._Description = new Column.Description({
            Value: value
        });
    }
    
};

const Сlient = class {
    constructor({
        id = null,
        Name = null,
        Description = null
    } = {}) {
        this.id = id;
        this.Name = Name;
        this.Description = Description;
    }

    get ColumnList() {
        return ['id', 'Name', 'Description'];
    }
    get TableName(){
        return 'Сlient';
    }
    get DicDescription(){
        return 'Справочник клиентов';
    }
    
    get id() {
        return this._id;
    }
    set id(value) {
        this._id = new Column.id({
            Value: value
        });
    }

    get Name() {
        return this._Name;
    }
    set Name(value) {
        this._Name = new Column.Name({
            Value: value,
            AllowNull: 'false'
        });
    }
    get Description() {
        return this._Description;
    }
    set Description(value) {
        this._Description = new Column.Description({
            Value: value
        });
    }
};

async function id_getNEW({
    SchemaName,
    TableName
} = {}) {
    let id = 0;
    //Получаем новый id из базы для схемы SchemaName таблицы TableName
    return id;
}

module.exports = {
    User,
    Сlient
};