const Column = require('./../column.js');

const User = class {
    constructor({
        id = null,
        Name = null,
        Description = null,
        Login = null,
        Password = null,
        DateBegin = null,
        DateEnd = null
    } = {}) {
        this.id = id;
        this.Name = Name;
        this.Description = Description;
        this.Login = Login;
        this.Password = Password;
        this.DateBegin = DateBegin;
        this.DateEnd = DateEnd;
    }

    get ColumnList() {
        return ['id', 'Name', 'Description', 'Login', 'Password', 'DateBegin', 'DateEnd'];
    }
    get TableName(){
        return 'User';
    }
    get FormDescription(){
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
    get Login() {
        return this._Login;
    }
    set Login(value) {
        this._Login = new Column.Login({
            Value: value
        });
    }
    get Password() {
        return this._Password;
    }
    set Password(value) {
        this._Password = new Column.Password({
            Value: value
        });
    }
    get DateBegin() {
        return this._DateBegin;
    }
    set DateBegin(value) {
        this._DateBegin = new Column.DateBegin({
            Value: value,
            Default: 'NOW()'
        });
    }
    get DateEnd() {
        return this._DateEnd;
    }
    set DateEnd(value) {
        this._DateEnd = new Column.DateEnd({
            Value: value
        });
    }
    
};

module.exports = {
    User
};