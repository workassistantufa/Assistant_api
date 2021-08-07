const Column = require('./../column.js');

const Material = class {
    constructor({
        id = null,
        Name = null,
        Description = null,
        Client_id = null,
        Contractor_id = null,
        DateBegin = null,
        DateEnd = null
    } = {}) {
        this.id = id;
        this.Name = Name;
        this.Description = Description;
        this.Client_id = Client_id;
        this.Contractor_id = Contractor_id;
        this.DateBegin = DateBegin;
        this.DateEnd = DateEnd;
    }

    get ColumnList() {
        return ['id', 'Name', 'Description', 'Client_id', 'Contractor_id', 'DateBegin', 'DateEnd'];
    }
    get TableName(){
        return 'Material';
    }
    get FormDescription(){
        return 'Справочник номенклатуры';
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
    get Client_id() {
        return this._Client_id;
    }
    set Client_id(value) {
        this._Client_id = new Column.Client_id({
            Value: value
        });
    }
    get Contractor_id() {
        return this._Contractor_id;
    }
    set Contractor_id(value) {
        this._Contractor_id = new Column.Contractor_id({
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
    Material
};