const Name = class {
    ColumnName = 'Name';
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
};

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
};

const Description = class {
    ColumnName = 'Description';
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
 };

module.exports = {
    Name,
    TableName,
    Description,
    Parent,
    Type,
    ColumnName,
    DataType,
    TableID
};