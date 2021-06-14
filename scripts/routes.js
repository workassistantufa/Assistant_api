const pg = require('./pg.js');
const fs = require('fs');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const config = require('.././config.js');

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

module.exports.get = async (ctx) => {
    console.log('get.query=', ctx.query);
    let type = ctx.query.type; //Тип окна
    let docID = ctx.query.docID; //id таблицы Documents
    let id = ctx.query.id; //id таблицы
    let response = {};
    let where = {};


    //Преобразуем JSON в текст
    ctx.response.body = JSON.stringify(response);
    /*
        switch (type) {
            case 'docJournal':
                response = await pg.getDocDictionary();
                break;

            case 'dicJournal':
                response = await pg.tableInfo({
                    type: 'dictionary'
                });
                break;

            default:
                response.Error = 'Error, dont find type';
                break;
        };
    */
    //response = await pg.createTable({columnList:{}});


    //response = await pg.create({
    //    docID:1,
    //    docColumn: {newcolumn1:'newcolumn1',newcolumn3:'newcolumn3'}
    //});
    //response = await pg.findByID({docID:1,id:3});


    //response = await pg.createColumn({
    //    tableID: 1,
    //    columnList: {}
    //});

    //response = await pg.findAll({docID:1});



    /*
        switch (type) {
            case 'documentConstructor':
                if (docID) where.id = Number(docID);
                response = await prisma.get({
                    docModelName: 'document',
                    where
                });
                break;

            case 'documentConstructorColumn':
                where.documentID = Number(docID);
                response = await prisma.get({
                    docModelName: 'docColumn',
                    where
                });
                break;

            case 'docJournal':
                let columns = {
                    id: true,
                    name: true
                };
                response = await prisma.get({
                    docModelName: 'document',
                    columns
                });
                break;

            case 'document':
                response = await prisma.getDocument({
                    docID,
                    id
                });
                console.log('response=', response);
                break;

            default:
                response.Error = 'Error, dont find type';
                break;
        };
        //Преобразуем JSON в текст
        ctx.response.body = JSON.stringify(response);
        */
};



module.exports.post = async (ctx) => {
    console.log("post_body:", ctx.request.body);
    let type = ctx.request.body.type; //Тип окна
    let docID = ctx.request.body.docID; //id таблицы Documents
    let docColumns = ctx.request.body.docColumns; //{} с полями и их значениями
    let response = {};

    switch (type) {
        case 'docJournal':
            response = await pg.createDocDictionary();
            break;

        case 'dic':
            const columnList = {
                type: 'dictionary'
            };
            response = await pg.createTable(columnList);
            break;

        default:
            response.Error = 'Error, dont find type';
            break;
    };
    //console.log('response=', response);
    ctx.response.body = response;
};
/*

module.exports.delete = async (ctx) => {
    console.log("delete.query:", ctx.query);
    let type = ctx.query.type; //Тип окна docID
    let docID = ctx.query.docID; //id таблицы Documents
    let id = ctx.query.id; //id через запятую
    let response = {};

    switch (type) {
        case 'documentConstructor':
            response = await prisma.delete({
                docModelName: 'document',
                docID,
                id
            });
            break;

        case 'documentConstructorColumn':
            response = await prisma.delete({
                docModelName: 'docColumn',
                docID,
                id
            });
            break;

        default:
            response.error = 'Error, dont find type';
            break;
    };
    console.log("delete_response:", response);
    ctx.response.body = response;
};
*/
module.exports.migrateDB = async (ctx) => {
    let response = {};
    let resp = [];

    let assistant_modules = config.assistant_modules;

    for await (const module of assistant_modules) {
        
        //Перебираем объекты из файла модуля schema.js
        const {
            Schema,
            TableList,
            СolumnList
        } = require('./../assistant_modules/' + module + '/schema.js');

        //Добавляем новую схему
        const schema = new Schema();
        response = await schema_add([schema]);
        resp.push(response);

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

        //Перебираем объекты из файла модуля dic.js
        const dictionaryModels = require('./../assistant_modules/' + module + '/dic.js');
        const dicList = Object.keys(dictionaryModels);
        for await (const dicModel of dicList) {
            //Добавляем таблицу справочника в новой схеме
            const dic = new dictionaryModels[dicModel]();
            response = await table_add([{
                Schema: schema,
                Table: dic
            }]);
            resp.push(response);

            //Добавляем столбцы справочника в новой схеме        
            response = await column_add([{
                Schema: schema,
                Table: dic
            }]);
            resp.push(response);
        };

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
        };
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
async function schema_add(schemaModels = []) {
    let response = {};
    let resp = [];

    for await (const schemaModel of schemaModels) {
        //Узнаём  информацию о схеме в БД
        const Content = {
            Type: 'schema',
            Name: schemaModel.SchemaName
        };
        const db_schemaInfo = await pg.dbInfo(Content);
        //console.log('db_schemaInfo=', db_schemaInfo);
        //Еслисхемы нет - создаём
        if (!db_schemaInfo.Exists) {
            response = await pg.createSchema({
                Name: schemaModel.SchemaName
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
            Schema: tableModel.Schema.SchemaName,
            Name: tableModel.Table.TableName
        };
        const db_tableInfo = await pg.dbInfo(Content);
        //console.log('db_tableInfo=',db_tableInfo);

        //Если таблицы нет - создаём
        if (!db_tableInfo.Exists) {
            const Entity = {
                Type: 'table',
                Schema: tableModel.Schema.SchemaName,
                Name: tableModel.Table.TableName,
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
        const columnList_needAdd = tableModel.Table.columnList_get();
        
        //Узнаём  информацию о таблице в БД и о её полях
        const Content = {
            Type: 'table',
            Schema: tableModel.Schema.SchemaName,
            Name: tableModel.Table.TableName
        };
        const db_tableInfo = await pg.dbInfo(Content);
        //console.log('db_tableInfo=',db_tableInfo);

        for await (const column of columnList_needAdd) {
            //Есть ли столбец в таблице в БД
            const haveColumn = db_tableInfo.columnList.some(row => row.column_name == column.ColumnName);
            //Если столбца в таблице в БД нет - добавляем
            if (!haveColumn) columnList.push(column);
        };

        const Entity = {
            Type: 'table',
            Method: 'alter',
            Schema: tableModel.Schema.SchemaName,
            Name: tableModel.Table.TableName,
            columnList: columnList
        };
        //console.log('Entity=',Entity);
        response = await pg.entityChange(Entity);
        resp.push(response);
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