const Name = class {
    constructor() {
        this.ColumnName = 'Name';
        this.DataType = 'Text';
        this.AllowNull = 'true';
        this.Unique = 'false';
    }

    get ColumnName() {
        return this.ColumnName;
    }

    get DataType() {
        return this.DataType;
    }

    get AllowNull() {
        return this.AllowNull;
    }
    set AllowNull(value = 'true') {
        this.AllowNull = value ? 'true' : 'false';
    } 

    get Unique() {
        return this.Unique;
    }
    set Unique(value = 'true') {
        this.Unique = value ? 'true' : 'false';
    }
}

module.exports = {
    Name
};