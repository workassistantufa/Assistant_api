const id = class {
    constructor({
        Value = null
    } = {}) {
        this.Value = Value;
    }

    get ColumnName() {
        return 'id'
    }
    get DataType() {
        return 'Bigint';
    }
    get AllowNull() {
        return 'false';
    }
    get Unique() {
        return 'true';
    }
    get Default() {
        return 'No Default';
    }
    get References() {
        return 'No References';
    }
    get Value() {
        return this._Value;
    }
    set Value(value = 0) {
        if (value <= 0) throw new Error("Ошибка: id <= 0");
        this._Value = value;
    }
};

//Базовые свойства поля
class Column {
    constructor({
        Value = null,
        AllowNull = true,
        Unique = false,
        Default = '',
        References = ''
    } = {}) {
        if ((Unique == true) && (Default != '')) throw new Error("Ошибка: Default - Unique Поля взаимоисключающие");
        this.Value = Value;
        this.AllowNull = AllowNull;
        this.Unique = Unique;
        this.Default = Default;
        this.References = References;
    }
    get AllowNull() {
        return this._AllowNull;
    }
    set AllowNull(value = 'true') {
        this._AllowNull = value;
    }
    get Unique() {
        return this._Unique;
    }
    set Unique(value) {
        this._Unique = value;
    }
    get Default() {
        return this._Default;
    }
    set Default(value) {
        this._Default = value;
    }
    get References() {
        return this._References;
    }
    set References(value = '') {
        this._References = value;
    }
    get Value() {
        return this._Value;
    }
    set Value(value = '') {
        this._Value = value;
    }
};

const Name = class extends Column {
    constructor(...args) {
        super(...args);
    }
    get ColumnName() {
        return 'Name';
    }
    get DataType() {
        return 'Text';
    }
};

const Description = class extends Column  {
    constructor(...args) {
        super(...args);
    }
    get ColumnName() {
        return 'Description';
    }
    get DataType() {
        return 'Text';
    }
};

const Parent = class {
    ColumnName = 'Parent';
    get ColumnName() {
        return this.ColumnName;
    }

    DataType = 'Bigint';
    get DataType() {
        return this.DataType;
    }

    AllowNull = 'true';
    get AllowNull() {
        return this.AllowNull;
    }
    set AllowNull(value = 'true') {
        this.AllowNull = value ? 'true' : 'false';
    }

    Unique = 'false';
    get Unique() {
        return this.Unique;
    }
    set Unique(value = 'false') {
        this.Unique = value ? 'true' : 'false';
    }

    //Default - Unique  //Поля взаимоисключающие !!!!!!!!!!!!!!!!
    Default = '';
    get Default() {
        return this.Default;
    }
    set Default(value = '') {
        this.Default = value ? value : '';
    }

    References = '';
    get References() {
        return this.References;
    }
    set References(value = '') {
        this.References = value ? value : '';
    }

    Value = null;
    get Value() {
        return this.Value;
    }
    set Value(value = '') {
        this.Value = value ? value : '';
    }
};

const Type = class {
    //Тип таблицы: Документ(document), Справочник(dictionary)
    ColumnName = 'Type';
    get ColumnName() {
        return this.ColumnName;
    }

    DataType = 'Text';
    get DataType() {
        return this.DataType;
    }

    AllowNull = 'true';
    get AllowNull() {
        return this.AllowNull;
    }
    set AllowNull(value = 'true') {
        this.AllowNull = value ? 'true' : 'false';
    }

    Unique = 'false';
    get Unique() {
        return this.Unique;
    }
    set Unique(value = 'false') {
        this.Unique = value ? 'true' : 'false';
    }

    //Default - Unique  //Поля взаимоисключающие !!!!!!!!!!!!!!!!
    Default = '';
    get Default() {
        return this.Default;
    }
    set Default(value = '') {
        this.Default = value ? value : '';
    }

    References = '';
    get References() {
        return this.References;
    }
    set References(value = '') {
        this.References = value ? value : '';
    }

    Value = null;
    get Value() {
        return this.Value;
    }
    set Value(value = '') {
        this.Value = value ? value : '';
    }
};

const TableID = class {
    ColumnName = 'TableID';
    get ColumnName() {
        return this.ColumnName;
    }

    DataType = 'Bigserial';
    get DataType() {
        return this.DataType;
    }

    AllowNull = 'true';
    get AllowNull() {
        return this.AllowNull;
    }
    set AllowNull(value = 'true') {
        this.AllowNull = value ? 'true' : 'false';
    }

    Unique = 'false';
    get Unique() {
        return this.Unique;
    }
    set Unique(value = 'false') {
        this.Unique = value ? 'true' : 'false';
    }

    //Default - Unique  //Поля взаимоисключающие !!!!!!!!!!!!!!!!
    Default = '';
    get Default() {
        return this.Default;
    }
    set Default(value = '') {
        this.Default = value ? value : '';
    }

    References = '';
    get References() {
        return this.References;
    }
    set References(value = '') {
        this.References = value ? value : '';
    }

    Value = null;
    get Value() {
        return this.Value;
    }
    set Value(value = '') {
        this.Value = value ? value : '';
    }
};

module.exports = {
    id,
    Name,
    Description,
    Parent,
    Type,
    TableID
};

/*
const TableName = class {
    ColumnName = 'TableName';
    get ColumnName() {
        return this.ColumnName;
    }

    DataType = 'Text';
    get DataType() {
        return this.DataType;
    }

    AllowNull = 'true';
    get AllowNull() {
        return this.AllowNull;
    }
    set AllowNull(value = 'true') {
        this.AllowNull = value ? 'true' : 'false';
    }

    Unique = 'false';
    get Unique() {
        return this.Unique;
    }
    set Unique(value = 'false') {
        this.Unique = value ? 'true' : 'false';
    }

    //Default - Unique  //Поля взаимоисключающие !!!!!!!!!!!!!!!!
    Default = '';
    get Default() {
        return this.Default;
    }
    set Default(value = '') {
        this.Default = value ? value : '';
    }

    References = '';
    get References() {
        return this.References;
    }
    set References(value = '') {
        this.References = value ? value : '';
    }

    Value = null;
    get Value() {
        return this.Value;
    }
    set Value(value = '') {
        this.Value = value ? value : '';
    }
};
const ColumnName = class {
    ColumnName = 'ColumnName';
    get ColumnName() {
        return this.ColumnName;
    }

    DataType = 'Text';
    get DataType() {
        return this.DataType;
    }

    AllowNull = 'true';
    get AllowNull() {
        return this.AllowNull;
    }
    set AllowNull(value = 'true') {
        this.AllowNull = value ? 'true' : 'false';
    }

    Unique = 'false';
    get Unique() {
        return this.Unique;
    }
    set Unique(value = 'false') {
        this.Unique = value ? 'true' : 'false';
    }

    //Default - Unique  //Поля взаимоисключающие !!!!!!!!!!!!!!!!
    Default = '';
    get Default() {
        return this.Default;
    }
    set Default(value = '') {
        this.Default = value ? value : '';
    }

    References = '';
    get References() {
        return this.References;
    }
    set References(value = '') {
        this.References = value ? value : '';
    }

    Value = null;
    get Value() {
        return this.Value;
    }
    set Value(value = '') {
        this.Value = value ? value : '';
    }
};

const DataType = class {
    ColumnName = 'DataType';
    get ColumnName() {
        return this.ColumnName;
    }

    DataType = 'Text';
    get DataType() {
        return this.DataType;
    }

    AllowNull = 'true';
    get AllowNull() {
        return this.AllowNull;
    }
    set AllowNull(value = 'true') {
        this.AllowNull = value ? 'true' : 'false';
    }

    Unique = 'false';
    get Unique() {
        return this.Unique;
    }
    set Unique(value = 'false') {
        this.Unique = value ? 'true' : 'false';
    }

    //Default - Unique  //Поля взаимоисключающие !!!!!!!!!!!!!!!!
    Default = '';
    get Default() {
        return this.Default;
    }
    set Default(value = '') {
        this.Default = value ? value : '';
    }

    References = '';
    get References() {
        return this.References;
    }
    set References(value = '') {
        this.References = value ? value : '';
    }

    Value = null;
    get Value() {
        return this.Value;
    }
    set Value(value = '') {
        this.Value = value ? value : '';
    }
};
*/