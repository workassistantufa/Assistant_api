const Column = require('./../column.js');

const Entity = class {
    constructor({
        id = null,
        Name = null,
        Token = null,
        Parent = null,
        DateBegin = null,
        DateEnd = null
    } = {}) {
        this.id = id;
        this.Name = Name;
        this.Token = Token;
        this.Parent = Parent;
        this.DateBegin = DateBegin;
        this.DateEnd = DateEnd;
    }

    get ColumnList() {
        return ['id', 'Name', 'Token', 'Parent','DateBegin', 'DateEnd'];
    }
    get TableName() {
        return 'Entity';
    }
    get FormDescription() {
        return 'Строки документов Складского документооборота';
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
    get Token() {
        return this._Token;
    }
    set Token(value) {
        this._Token = new Column.Token({
            Value: value
        });
    }
    get Parent() {
        return this._Parent;
    }
    set Parent(value) {
        this._Parent = new Column.Parent({
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
    Entity
};