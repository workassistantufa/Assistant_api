const Column = require('./../column.js');

const DocMovement = class {
    constructor({
        id = null,
        Name = null,
        Nomer = null,
        Date = null,
        Storage_id = null,
        User_id = null,
        Client_id = null,
        Contractor_id = null,
        DateBegin = null,
        DateEnd = null
    } = {}) {
        this.id = id;
        this.Name = Name;
        this.Nomer = Nomer;
        this.Date = Date;
        this.Storage_id = Storage_id;
        this.User_id = User_id;
        this.Client_id = Client_id;
        this.Contractor_id = Contractor_id;
        this.DateBegin = DateBegin;
        this.DateEnd = DateEnd;
    }

    get ColumnList() {
        return ['id', 'Name', 'Nomer', 'Date', 'User_id', 'Storage_id', 'Client_id', 'Contractor_id', 'DateBegin', 'DateEnd'];
    }
    get TableName() {
        return 'DocMovement';
    }
    get FormDescription() {
        return 'Складской документооборот';
    }

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
            Value: value
        });
    }
    get Nomer() {
        return this._Nomer;
    }
    set Nomer(value) {
        this._Nomer = new Column.Nomer({
            Value: value
        });
    }
    get Date() {
        return this._Date;
    }
    set Date(value) {
        this._Date = new Column.Date({
            Value: value
        });
    }
    get Storage_id() {
        return this._Storage_id;
    }
    set Storage_id(value) {
        this._Storage_id = new Column.Storage_id({
            Value: value,
            References: ' "dictionary"."Storage" (id)'
        });
    }
    get User_id() {
        return this._User_id;
    }
    set User_id(value) {
        this._User_id = new Column.User_id({
            Value: value,
            References: ' "dictionary"."User" (id)'
        });
    }
    get Client_id() {
        return this._Client_id;
    }
    set Client_id(value) {
        this._Client_id = new Column.Client_id({
            Value: value,
            References: ' "dictionary"."Client" ("id")'
        });
    }
    get Contractor_id() {
        return this._Contractor_id;
    }
    set Contractor_id(value) {
        this._Contractor_id = new Column.Contractor_id({
            Value: value,
            References: ' "dictionary"."Contractor" ("id")'
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
    DocMovement
};