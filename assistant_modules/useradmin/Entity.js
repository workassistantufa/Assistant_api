const Column = require('./../column.js');

const Entity = class {
    constructor({
        id = null,
        Token = null,
        DateBegin = null,
        DateEnd = null
    } = {}) {
        this.id = id;
        this.Token = Token;
        this.DateBegin = DateBegin;
        this.DateEnd = DateEnd;
    }

    get ColumnList() {
        return ['id', 'Token', 'DateBegin', 'DateEnd'];
    }
    get TableName() {
        return 'Entity';
    }
    get FormDescription() {
        return 'Сессии пользователей';
    }
    get id() {
        return this._id;
    }
    set id(value = 0) {
        this._id = new Column.id({
            Value: value
        });
    }
    get Token() {
        return this._Token;
    }
    set Token(value) {
        this._Token = new Column.Token({
            Value: value,
            AllowNull: 'false'
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