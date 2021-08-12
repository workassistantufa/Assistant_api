const pg = require('./pg.js');
const fs = require('fs');
const util = require('util');
//const exec = util.promisify(require('child_process').exec);
const config = require('.././config.js');
const crypto = require('crypto');

/**
 * route module.
 * @module route
 */
module.exports.get_api = (ctx) => {
    ctx.body =
        `<html>
    <head>
     <meta http-equiv="content-type" content="text/html; charset=utf-8">
     <title>Ассистент сервер</title>
    </head>
    <body>
     <p>"Ассистент - удобный доступ к Вашим данным"</p>
     <p>"Сервер Ассистент запущен"</p>
     <p><a href="api">Тест get</a></p>
     <p><a href="migrateDB">Создание таблиц</a></p>
     <p><a href="visualization">Визуализация таблиц</a></p>
    </body>
   </html>`
};

/**
 * Получение данных из БД
 * @param {string} module - Наименование модуля(схемы)
 * @param {string} form - Наименование формы (module.FormList)
 * @param {BigInt} id - Порядковый номер документа 
 */
module.exports.get = async (ctx) => {
    console.log('get.query=', ctx.query);
    //let type = ctx.query.type; //Тип окна
    //let tableID = ctx.query.tableID; //id таблицы tableList
    //let TableName = ctx.query.TableName; //id таблицы tableList
    //let id = ctx.query.id; //id строки таблицы
    //let where = {};

    let response = {};
    const module = ctx.query.module;
    const form = ctx.query.form;
    const id = ctx.query.id;
    const UsertAuthID = ctx.query.UsertAuthID;

    try {
        if (module == 'session') response = await checkAutID({
            UsertAuthID
        })
        else if (!module) response = await moduleList_get();
        else {
            response = await module_get({
                module,
                form,
                id
            });
        };
    } catch (error) {
        response.Error = error;
    }



    //let module = 'useradmin';
    //const dictionaryModels = require('./../assistant_modules/' + module + '/dic.js');
    //const {id} = require('./../assistant_modules/column.js');
    //const dicList = Object.keys(dictionaryModels);
    //Object.assign(User.prototype, id);
    //let resp = new dictionaryModels.User({id:1,Name:'first'});
    //resp.Name.Default = 3;
    //resp.Name.AllowNull = 'aa'
    //console.log('resp.Name.Default=',resp.Name.Default);
    //response = resp;

    //console.log('response=',response);

    //console.log('dicList=',dictionaryModels.User);
    //type = 'dicJournal';
    //let TableName = 'User';
    //id = 0; //реестр
    /*
        
    */
    //Преобразуем JSON в текст
    ctx.response.body = JSON.stringify(response);
    //console.log('response=', response);
};

async function checkAutID({
    UsertAuthID = null
}) {
    if (!UsertAuthID) return {
        Error: 'Token is expired'
    };

    const module = require('./../assistant_modules/session/module.js');
    const form = new module.Entity.Entity({
        id: 1
    });
    const usertAuthIDRows = await pg.findAll({
        Schema: module.ModuleName,
        TableName: 'Entity',
        ColumnList: form.ColumnList
    });
    console.log('usertAuthIDRows=', usertAuthIDRows);
    const authIDCorrect = usertAuthIDRows.some(row => row.Token == UsertAuthID && row.DateEnd == null)
    if (authIDCorrect) return {
        Error: 'Token is correct'
    }
    else return {
        Error: 'Token is expired'
    };
}

async function moduleList_get() {
    let response = {};
    let resp = [];
    const assistant_modules = config.assistant_modules;
    let id = 1;
    for await (const moduleName of assistant_modules) {
        const module = require('./../assistant_modules/' + moduleName + '/module.js');
        //console.log('module=',module.Description);
        const obj = {
            id,
            Name: module.Description,
            Description: moduleName,
            module: moduleName
        }
        id = id + 1;
        resp.push(obj);
    };
    return response = resp;
}

/**
 * Данные модуля
 * @param {Object.<string, string>} {module,form,id} наименование модуля, наименование формы, порядковый номер документа
 * @returns {Object.<string, string>} [{id,Name,Description}]
 */
async function module_get({
    module,
    form,
    id
} = {}) {
    let response = {};
    let resp = [];
    const _module = require('./../assistant_modules/' + module + '/module.js');
    const FormList = _module.FormList;

    if (!form) { //Список форм справочников
        let _id = 1;
        //Перебираем формы модуля(схемы)        
        for await (const formName of FormList) {
            const _form = new _module[formName][formName]({
                id: 1
            });
            const obj = {
                id: _id,
                Name: _form.FormDescription,
                form: formName
            };
            resp.push(obj);
            _id = _id + 1;
        };
        response = resp;
    } else if (id == 0) { //Реестр справочника
        const _form = new _module[form][form]({
            id: 1
        });
        //console.log('_form.ColumnList=',_form.ColumnList);
        const rows = await pg.findAll({
            Schema: _module.ModuleName,
            TableName: _form.TableName,
            ColumnList: _form.ColumnList
        });
        //console.log('rows=', rows); 
        response = rows.map((row) => {
            return {
                id: row.id,
                Name: row.Name ? row.Name : '',
                Description: row.Description ? row.Description : ''
            };
        });

    } else if (id > 0) {
        const _form = new _module[form][form]({
            id: 1
        });
        const data = await pg.findByID({
            Schema: _module.ModuleName,
            TableName: _form.TableName,
            ColumnList: _form.ColumnList,
            id
        });
        //console.log('resp=',resp);
        const formData = new _module[form][form](data);
        console.log('formData=', formData);
        response = formData;
    };

    return response;
};

module.exports.post = async (ctx) => {
    console.log("post_body:", ctx.request);
    //let type = ctx.request.body.type; //Тип окна
    //let tableID = ctx.request.body.tableID; //id таблицы tableList
    //let TableName = ctx.request.body.TableName;
    //let columnList = ctx.request.body.columnList; //{} с полями и их значениями
    let response = {};
    
    try {
        const module = ctx.request.body.module;
        const form = ctx.request.body.form;
        const data = ctx.request.body.data; //{} с полями и их значениями

        if (module == 'session') response = await auth(data);
        else if (module && form) {
            response = await addData({
                module,
                form,
                data
            });
        };
    } catch (error) {
        response.Error = error;
    }


    //Преобразуем JSON в текст
    ctx.response.body = JSON.stringify(response);
};

async function auth(data = {}) {
    let response = {};
    let newRow = {};

    //return response = await pg.conninfo();

    const moduleDictionary = require('./../assistant_modules/dictionary/module.js');
    //Ищем id в таблице User по Login и Password
    let form = new moduleDictionary.User.User({
        id: 1
    });

    let rows = await pg.findAll({
        Schema: moduleDictionary.ModuleName,
        TableName: form.TableName,
        ColumnList: form.ColumnList
    });
    console.log('User.rows=', rows);
    const correctUser = rows.find(row => row.Login == data.Login && row.Password == data.Password);
    //console.log('correctUser=',correctUser);

    if (!correctUser) return response = {
        Error: 'Error login or password'
    };

    //Ищем код DocMovement по данному correctUser
    const moduleSession = require('./../assistant_modules/session/module.js');
    form = new moduleSession.DocMovement.DocMovement({
        id: correctUser.id,
        Type: 'User'
    });
    rows = await pg.findAll({
        Schema: moduleSession.ModuleName,
        TableName: form.TableName,
        ColumnList: form.ColumnList
    });
    let rowDocMovement = rows.some(row => row.User_id == correctUser.id);
    //console.log('haveRecord=',haveRecord);

    //Если в таблице DocMovement нет такого correctUser - создаём
    if (!rowDocMovement) {
        newRow = await pg.create({
            Schema: moduleSession.ModuleName,
            TableName: form.TableName
        });
        response = await addData({
            module: moduleSession.ModuleName,
            form: form.TableName,
            data: {
                id: newRow.id,
                Type: 'User',
                User_id: correctUser.id
            }
        });
        rowDocMovement = newRow;
    };

    //Создаём запись в Entity
    form = new moduleSession.Entity.Entity({
        id: correctUser.id
    });
    newRow = await pg.create({
        Schema: moduleSession.ModuleName,
        TableName: form.TableName
    });

    //Генрируем токен
    const Token = await crypto.randomBytes(64).toString('hex');
    const DateBegin = (new Date()).getTime();
    const timeToLife = 10000000000;
    const DateEnd = DateBegin + timeToLife;

    //Записываем токен в БД в Entity
    await addData({
        module: moduleSession.ModuleName,
        form: form.TableName,
        data: {
            id: newRow.id,
            Parent: rowDocMovement.id,
            Token: Token,
            //DateBegin: new Date(DateBegin),
            //DateEnd: new Date(DateEnd)
        }
    });

    return response = {
        Token: Token
    };
};

async function addData({
    module,
    form,
    data
} = {}) {
    let response = {};
    if (!data) {
        const Content = {
            Schema: module,
            TableName: form
        };
        response = await pg.create(Content);
    } else {
        const _module = require('./../assistant_modules/' + module + '/module.js');
        const haveForm = _module.FormList.some(r => r == form);
        if (haveForm) { //Если такая форма действительно есть
            const _form = new _module[form][form](data);
            console.log('_form=', _form);

            const Content = {
                Schema: module,
                TableName: form,
                ColumnList: _form
            };
            response = await pg.updateRow(Content);
        };
    };

    return response;
};

module.exports.delete = async (ctx) => {
    console.log("delete.query:", ctx.query);
    let response = {};
    const module = ctx.request.body.module;
    const form = ctx.request.body.form;
    const columnList = ctx.request.body.columnList; //{} с [{row.id}]

    const Content = {
        Schema: module,
        TableName: form,
        ColumnList: columnList
    };
    response = await pg.deleteRow(Content);

    console.log("delete_response:", response);
    ctx.response.body = response;
};

module.exports.migrateDB = async (ctx) => {
    let response = {};
    let resp = [];

    let assistant_modules = config.assistant_modules;

    for await (const _module of assistant_modules) {

        //Перебираем объекты из файла модуля module.js
        const module = require('./../assistant_modules/' + _module + '/module.js');

        //Добавляем новую схему
        const SchemaName = module.ModuleName;
        response = await schema_add([SchemaName]);
        resp.push(response);

        //Перебираем формы из модуля
        const FormList = module.FormList;
        //const dicList = Object.keys(dictionaryModels);
        for await (const FormName of FormList) {
            //console.log('FormName=',FormName);
            const TableModel = new module[FormName][FormName]({
                id: 1
            });
            //console.log('form=',form.TableName);

            //Добавляем таблицу в новой схеме
            response = await table_add([{
                SchemaName: SchemaName,
                TableName: TableModel.TableName
            }]);
            resp.push(response);

            //Добавляем столбцы в новой схеме        
            response = await column_add([{
                SchemaName: SchemaName,
                TableModel: TableModel
            }]);
            resp.push(response);
        };
        /*
        //Добавляем таблицу tableList в новой схеме
        const tableList = new TableList();
        response = await table_add([{
            Schema: schema,
            Table: tableList
        }]);
        resp.push(response);

        //Добавляем столбцы таблицы tableList в новой схеме        
        response = await column_add([{
            Schema: schema,
            Table: tableList
        }]);
        resp.push(response);

        //Добавляем таблицу columnList в новой схеме
        const columnList = new СolumnList();
        response = await table_add([{
            Schema: schema,
            Table: columnList
        }]);
        resp.push(response);

        //Добавляем столбцы таблицы columnList в новой схеме        
        response = await column_add([{
            Schema: schema,
            Table: columnList
        }]);
        resp.push(response);
*/
        /*
                    //Добавляем таблицу справочника в таблицу tableList
                    response = await tableList_add([{
                        Schema: schema,
                        Table: dic,
                        Type: 'dictionary'
                    }]);
                    resp.push(response);

                    //Добавляем таблицу справочника в новой схеме
                    response = await table_add([{
                        Schema: schema,
                        Table: dic
                    }]);
                    resp.push(response);


                    //Добавляем столбцы таблицы справочника в таблицу columnList
                    response = await columnList_add([{
                        Schema: schema,
                        Table: dic,
                        Type: 'dictionary'
                    }]);
                    resp.push(response);
                    //Добавляем столбцы справочника в новой схеме        
                    response = await column_add([{
                        Schema: schema,
                        Table: dic
                    }]);
                    resp.push(response);

                //Перебираем объекты из файла модуля doc.js
                const documentModels = require('./../assistant_modules/' + module + '/doc.js');
                const docList = Object.keys(documentModels);
                for await (const docModel of docList) {
                    //Добавляем таблицу справочника в новой схеме
                    const doc = new documentModels[docModel]();
                    response = await table_add([{
                        Schema: schema,
                        Table: doc
                    }]);
                    resp.push(response);

                    //Добавляем столбцы справочника в новой схеме        
                    response = await column_add([{
                        Schema: schema,
                        Table: doc
                    }]);
                    resp.push(response);
                };*/
    };

    //Преобразуем JSON в текст
    ctx.response.body = JSON.stringify(resp);
};

/**
 * Создание таблицы в БД если её нет
 * @param {Object.<string, string>} db_tableInfo - имеющаяся информация о таблице в БД.
 * @param {string} tablename - наименование таблицы.
 * @returns {Object.<string, string>} - информация: Message или Error.
 */
/*async function table_create(db_tableInfo, tablename) {
    let response = {};

    //Если таблицы нет - создаём
    if (!db_tableInfo.Exists) {
        const Entity = {
            Type: 'table',
            Name: tablename,
            Method: 'create'
        };
        const EntityChange = await pg.entityChange(Entity);
        //console.log('EntityChange=', EntityChange);
        response = EntityChange;
    };
    return response;
}
*/
/**
 * Создание столбца таблицы в БД если её нет
 * @param {Object[]} db_columnList - имеющаяся информация о таблице в БД.
 * @param {string} tablename - наименование таблицы.
 * @param {Object[]}  columns - свойства столбцов.
 * @returns {Object[]} - информация: Message или Error.
 */
/*
async function column_create(db_columnList, tablename, columns) {
    let response = {};
    let resp = [];

    for await (const column of columns) {
        //Есть ли столбец в таблице
        const haveColumn = db_columnList.some(row => row.column_name == column.columnname);
        //Если столбца нет - добавляем на создание
        if (!haveColumn) {
            let columnList = [];
            columnList.push(column);
            const Entity = {
                Type: 'table',
                Name: tablename,
                Method: 'alter',
                columnList: columnList
            };

            const EntityChange = await pg.entityChange(Entity);
            //console.log('EntityChange=', EntityChange);
            resp.push(EntityChange);
        };
    };
    return response = resp;
};
*/
/**
 * Собираем данные о служебных таблицах
 * @returns {Object[]} [{tablename, columnList[]}]
 */
/*
async function serviceTables_add() {
    //Узнаём информацию о таблице tablelist в БД
    let Content = {
        Type: 'table',
        Name: 'tablelist'
    };
    let db_tableInfo = await pg.dbInfo(Content);
    if (!db_tableInfo.Exists) return;

    //Узнаём информацию о таблице docdictionary в tablelist
    let tableInfo = await pg.tableInfo();
    let haveTable = tableInfo.some(row => row.tablename == 'docdictionary');
    const docDictionary = config.docDictionary_get();
    if (!haveTable) {
        //Записываем информацию в таблицу tablelist       
        let columnList = {
            name: "Типы документов.",
            tableName: docDictionary.tablename,
            description: "Справочник типов документов."
        };
        await pg.createTable({
            columnList
        });
    } else {
        const table = tableInfo.find(row => row.tablename == 'docdictionary');
        const columnListInfo = await pg.columnListInfo({
            tableID: table.id
        });
        for await (const column of docDictionary.columnList) {
            //Есть ли столбец в таблице
            const haveColumn = columnListInfo.some(row => row.columnname == column.columnname);
            if (!haveColumn) {
                let columnList = {
                    columnName: column.columnname,
                    datatype: column.datatype
                };
                //console.log('columnList=',columnList,table.id);
                //Записываем информацию в таблицу columnlist  
                await pg.createColumn({
                    columnList,
                    tableID: table.id
                });
            };
        };
    }



    //Узнаём информацию о таблице movement в tablelist
    tableInfo = await pg.tableInfo();
    haveTable = tableInfo.some(row => row.tablename == 'movement');
    const movement = config.movement_get();
    if (!haveTable) {
        //Записываем информацию в таблицу tablelist
        let columnList = {
            name: "Таблица движения.",
            tableName: movement.tablename,
            description: "Таблица движения (изменения аналитик) объектов учёта."
        };
        //console.log('columnList=',columnList);
        const newTable = await pg.createTable({
            columnList
        });
    } else {
        const table = tableInfo.find(row => row.tablename == 'movement');
        const columnListInfo = await pg.columnListInfo({
            tableID: table.id
        });
        for await (const column of movement.columnList) {
            const haveColumn = columnListInfo.some(row => row.columnname == column.columnname);
            if (!haveColumn) {
                let columnList = {
                    columnName: column.columnname,
                    datatype: column.datatype
                };
                //console.log('columnList=',columnList,table.id);
                await pg.createColumn({
                    columnList,
                    tableID: table.id
                });
            };
        };
    };
};
*/
/**
 * Проверка наличия в БД схемы и создание её при отсутствии
 * @param {Object[]} schemaModels объект класса Schema 
 * @returns {Object.<string, string>} - информация: Message или Error.
 */
async function schema_add(schemaNames = []) {
    let response = {};
    let resp = [];

    for await (const SchemaName of schemaNames) {
        //Узнаём  информацию о схеме в БД
        const Content = {
            Type: 'schema',
            Name: SchemaName
        };
        const db_schemaInfo = await pg.dbInfo(Content);
        //console.log('db_schemaInfo=', db_schemaInfo);
        //Еслисхемы нет - создаём
        if (!db_schemaInfo.Exists) {
            response = await pg.createSchema({
                Name: SchemaName
            });
            resp.push(response);
        };
    };
    return response = resp;
};

/**
 * Создание таблицы в БД если её нет
 * @param {Object[]} tableModels - объекты классов Schema и Table
 * @returns {Object.<string, string>} - информация: Message или Error.
 */
async function table_add(tableModels = []) {
    let response = {};
    let resp = [];

    for await (const tableModel of tableModels) {
        //Узнаём  информацию о таблице в БД
        const Content = {
            Type: 'table',
            Schema: tableModel.SchemaName,
            Name: tableModel.TableName
        };
        const db_tableInfo = await pg.dbInfo(Content);
        //console.log('db_tableInfo=',db_tableInfo);

        //Если таблицы нет - создаём
        if (!db_tableInfo.Exists) {
            const Entity = {
                Type: 'table',
                Schema: tableModel.SchemaName,
                Name: tableModel.TableName,
                Method: 'create'
            };
            response = await pg.entityChange(Entity);
            //console.log('response=', response);
            resp.push(response);
        };
    };
    return response;
};

/**
 * Создание столбцы таблицы в БД если их нет
 * @param {Object[]} tableModels - объекты классов Schema и Table
 * @returns {Object.<string, string>} - информация: Message или Error.
 */
async function column_add(tableModels = []) {
    let response = {};
    let resp = [];
    let columnList = [];

    for await (const tableModel of tableModels) {
        //Узнаём информацию какие столбцы надо создать
        const columnList_needAdd = tableModel.TableModel.ColumnList;
        //console.log('tableModel.TableModel.TableName=',tableModel.TableModel.TableName);

        //Узнаём  информацию о таблице в БД и о её полях
        const Content = {
            Type: 'table',
            Schema: tableModel.SchemaName,
            Name: tableModel.TableModel.TableName
        };
        const db_tableInfo = await pg.dbInfo(Content);
        //console.log('db_tableInfo=',db_tableInfo);

        for await (const column of columnList_needAdd) {
            //Есть ли столбец в таблице в БД
            const haveColumn = db_tableInfo.columnList.some(row => row.column_name == column);
            //Если столбца в таблице в БД нет - добавляем
            if (!haveColumn) columnList.push(column);
        };

        const Entity = {
            Type: 'table',
            Method: 'alter',
            Schema: tableModel.SchemaName,
            Name: tableModel.TableModel.TableName,
            columnList: columnList,
            TableModel: tableModel.TableModel
        };
        //console.log('Entity=',Entity);
        response = await pg.entityChange(Entity);
        resp.push(response);
    };

    return response = resp;
};


/**
 * Создание таблицы в БД если её нет
 * @param {Object[]} tableModels - объекты классов Schema и Table
 * @returns {Object.<string, string>} - информация: Message или Error.
 */
async function tableList_add(tableModels = []) {
    let response = {};
    let resp = [];

    for await (const tableModel of tableModels) {
        //console.log('tableModel=',tableModel);
        //Узнаём  информацию о таблице в таблице tableList
        const Content = {
            Type: tableModel.Type,
            Schema: tableModel.Schema.SchemaName,
            TableName: tableModel.Table.TableName
        };
        //console.log('Content=',Content);
        const tableInfo = await pg.tableInfo(Content);
        //console.log('tableInfo=',tableInfo);

        //Если информации таблице нет - добавляем её в tableList
        if (!tableInfo.length) {
            //Узнаём информацию какие столбцы надо создать
            const columnList = tableModel.Table.columnList_get();
            //console.log('columnList=',columnList);
            const Name = columnList.find(row => row.ColumnName == 'Name');
            const Description = columnList.find(row => row.ColumnName == 'Description');
            const Parent = columnList.find(row => row.ColumnName == 'Parent');

            const Entity = {
                Schema: tableModel.Schema.SchemaName,
                Name: Name.Value,
                TableName: tableModel.Table.TableName,
                Description: Description.Value,
                Parent: Parent ? Parent.Value : null,
                Type: tableModel.Type
            };
            //console.log('Entity=', Entity);
            response = await pg.createTable(Entity);
            //console.log('response=', response);
            resp.push(response);
        };
    };
    return response = resp;
};


/**
 * Создание таблицы в БД если её нет
 * @param {Object[]} tableModels - объекты классов Schema и Table
 * @returns {Object.<string, string>} - информация: Message или Error.
 */
async function columnList_add(tableModels = []) {
    let response = {};
    let resp = [];

    for await (const tableModel of tableModels) {
        //Узнаём  информацию о таблице в таблице tableList
        let Content = {
            Type: tableModel.Type,
            Schema: tableModel.Schema.SchemaName,
            TableName: tableModel.Table.TableName
        };
        const tableInfo = await pg.tableInfo(Content);
        //console.log('tableInfo=',tableInfo[0]);
        if (!tableInfo[0]) return response.Error = 'table not exist';

        //Узнаём  информацию о столбцах таблицы в таблице columnList
        Content = {
            Schema: tableModel.Schema.SchemaName,
            TableID: tableInfo[0].id
        };
        const columnListInfo = await pg.columnListInfo(Content);
        //console.log('columnListInfo=',columnListInfo);

        //Узнаём информацию какие столбцы надо создать
        const columnList_needAdd = tableModel.Table.columnList_get();

        for await (const column of columnList_needAdd) {
            //Есть ли столбец в таблице в БД
            const haveColumn = columnListInfo.some(row => row.ColumnName == column.ColumnName);
            //Если столбца в таблице columnList нет - добавляем
            if (!haveColumn) {
                const Entity = {
                    Schema: tableModel.Schema.SchemaName,
                    Name: column.Value,
                    ColumnName: column.ColumnName,
                    DataType: column.DataType,
                    TableID: tableInfo[0].id
                };
                //console.log('Entity=', Entity);
                response = await pg.createColumn(Entity);
                resp.push(response);
            };
        };
    };
    return response = resp;
};

module.exports.visualization = async (ctx) => {
    //Читаем информацию из файла
    const style = await fs.promises.readFile("./visual/style.css");
    const treeData = await fs.promises.readFile("./visual/treeData.js");
    const fullTreeScriptLib = await fs.promises.readFile("./visual/fullTreeScriptLib.js");
    ctx.body =
        `<html>
<head>
 <meta http-equiv="content-type" content="text/html; charset=utf-8">
 <title>Ассистент сервер</title>
</head>
<style>` + style + `</style>
<body>
<script src="http://d3js.org/d3.v3.min.js"></script>
<script>` + treeData + `</script>
<script>` + fullTreeScriptLib + `</script>
</body>
</html>`
};