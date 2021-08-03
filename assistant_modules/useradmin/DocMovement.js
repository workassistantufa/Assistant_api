const Column = require('./../column.js');

const DocMovement = class {
    constructor({
        id = null,
        Type = null,
        User_id = null,
        Client_id = null,
        DateBegin = null,
        DateEnd = null
    } = {}) {
        this.id = id;
        this.Type = Type; //User or Client
        this.User_id = User_id;
        this.Client_id = Client_id;
        this.DateBegin = DateBegin;
        this.DateEnd = DateEnd;
    }

    get ColumnList() {
        return ['id', 'Type', 'User_id', 'Client_id', 'DateBegin', 'DateEnd'];
    }
    get TableName() {
        return 'DocMovement';
    }
    get FormDescription() {
        return 'Сессии пользователя или клиента';
    }
    get id() {
        return this._id;
    }
    set id(value = 0) {
        this._id = new Column.id({
            Value: value
        });
    }

    get Type() {
        return this._Type;
    }
    set Type(value) {
        const validValue = ['User', 'Client'];
        if (!validValue.some(r => r == value)) throw new Error("Ошибка: DocMovement.Type must be: ['User','Client']");
        this._Type = new Column.Type({
            Value: value,
            AllowNull: 'false'
        });
    }
    get User_id() {
        return this._User_id;
    }
    set User_id(value) {
        this._User_id = new Column.User_id({
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