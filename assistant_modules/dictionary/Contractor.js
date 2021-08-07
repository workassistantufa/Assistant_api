const Column = require('./../column.js');

const Contractor = class {
    constructor({
        id = null,
        Name = null,
        Description = null,
        Adress = null,
        Telefon = null,
        DateBegin = null,
        DateEnd = null
    } = {}) {
        this.id = id;
        this.Name = Name;
        this.Description = Description;
        this.Adress  = Adress;
        this.Telefon = Telefon;
        this.DateBegin = DateBegin;
        this.DateEnd = DateEnd;
    }

    get ColumnList() {
        return ['id', 'Name', 'Description', 'Adress', 'Telefon', 'DateBegin', 'DateEnd'];
    }
    get TableName(){
        return 'Contractor';
    }
    get FormDescription(){
        return 'Справочник контрагентов';
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
    get Adress() {
        return this._Adress;
    }
    set Adress(value) {
        this._Adress = new Column.Adress({
            Value: value
        });
    }
    get Telefon() {
        return this._Telefon;
    }
    set Telefon(value) {
        this._Telefon = new Column.Telefon({
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
    Contractor
};