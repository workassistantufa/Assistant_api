const {
    Pool
} = require('pg');
const config = require('.././config.js');
const pool = new Pool(config.dbConfig);

/**
 * pg module.
 * @module pg
 */

/**
 * Поиск записи в таблице по docID и/или id.
 * @param {BigInt} docID - id таблицы document.
 * @param {BigInt} id - id таблицы docColumn.
 * @returns {Object.<string, string>} Возвращает строку таблицы в виде объекта, типа: Ключ - Наименование столбца, значение - Содержимое столбца.
 */
/*
async function findByID({
    docID,
    id
}) {
    let response = {};
    let res = {};
    if (!docID) return response.Error = 'docID is null';
    if (!id) return response.Error = 'id is null';

    const client = await pool.connect();
    try {
        res = await client.query('SELECT * FROM document WHERE id = $1', [docID]);
        console.log('res=', res.rows[0]);
        const doc = res.rows[0];
        res = await client.query('SELECT * FROM ' + doc.tablename + ' WHERE id = $1', [id]);
        response = res.rows[0];
    } catch (error) {
        console.log(error.stack);
        response.Error = error.stack;
    } finally {
        client.release();
    };
    return response;
};
*/
/**
 * Поиск записей в таблице по docID и/или условию where.
 * @param {BigInt} docID - id таблицы document.
 * @param {Object.<string, string>} where - условие поиска. Ключ - Наименование столбца, значение - Содержимое столбца.
 * @returns {Object[]} Возвращает строки таблицы в виде объекта, типа: Ключ - Наименование столбца, значение - Содержимое столбца.
 */
/*
async function findAll({
    tableID,
    where
}) {
    let response = {};
    let res = {};
    //if (!docID) return response.Error = 'docID is null';

    const client = await pool.connect();
    try {
        //Если есть where - ищем по условию в таблице документа
        if (where && docID) {
            res = await client.query('SELECT * FROM document WHERE id = $1', [docID]);
            console.log('res=', res.rows[0]);
            const doc = res.rows[0];
            const key = Object.keys(where);
            const value = Object.values(where);
            const tableData = await client.query('SELECT * FROM ' + doc.rows[0].tablename + ' WHERE $1 = $2', [key[0], value[0]]);
            response = tableData.rows;
        } else if (docID) { //Если нет where - ищем все записи в таблице документа
            const doc = await client.query('SELECT * FROM document WHERE id = $1', [docID]);
            console.log('doc=', doc.rows[0]);
            const tableData = await client.query('SELECT * FROM ' + doc.rows[0].tablename);
            response = tableData.rows;
        } else {
            let res = await client.query('SELECT * FROM document');
            const docModel = res.rows;
            res = await client.query('SELECT * FROM docColumn');
            const docColumnModel = res.rows;
            response = {
                docModel,
                docColumnModel
            };
        };
    } catch (error) {
        console.log(error.stack);
        response.Error = error.stack;
    } finally {
        client.release();
    };
    return response;
};
*/
/**
 * Поиск записи в таблице по docID и id, также потск данных в дочерних таблицах.
 * @param {BigInt} docID - id таблицы document.
 * @param {BigInt} id - id таблицы docColumn.
 * @returns {Object[]} Возвращает строки таблиц в виде объекта, типа: Ключ - Наименование столбца, значение - Содержимое столбца.
 */
async function findWithChildren({
    docID,
    id
}) {
    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!ДОДЕЛАТЬ!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    let response = {};
    if (!docID) return response.Error = 'docID is null';

    const client = await pool.connect();
    try {
        const mainTableName = await client.query('SELECT * FROM document WHERE id = $1', [docID]);
        const mainTableData = await client.query('SELECT * FROM ' + mainTableName.rows[0].tablename + ' WHERE id = $1');
        response.mainTableData = mainTableData;

        const childrenTableNames = await client.query('SELECT * FROM document WHERE parent = $1', [docID]);
        //Асинхронный перебор массива
        for await (const childrenTableName of childrenTableNames) {
            response[tableName] = await client.query('SELECT * FROM ' + tableName + ' WHERE' + mainTableName.rows[0].tablename + 'ID = $1', [id]);
        };

    } catch (error) {
        console.log(error.stack);
        response.Error = error.stack;
    } finally {
        client.release();
    };
    return response;
};

/**
 * Возвращает информацию о столбцах таблиц системы
 * @param {BigInt} tableID - id таблицы tablelist.
 * @returns {Object[]} Возвращает строки таблицы в виде объекта, типа: Ключ - Наименование столбца, значение - Содержимое столбца.
 */
async function tableInfo({
    tableID,
    type
} = {}) {
    let response = {};
    let res = {};
    const client = await pool.connect();
    try {
        if (tableID) {
            res = await client.query('SELECT * FROM tablelist WHERE id = $1', [tableID]);
            response = res.rows[0];
        } else if (type) {
            res = await client.query('SELECT * FROM tablelist WHERE type = $1', [type]);
            response = res.rows;
        } else {
            res = await client.query('SELECT * FROM tablelist');
            response = res.rows;
        };
    } catch (error) {
        console.log(error.stack);
        response.Error = error.stack;
    } finally {
        client.release();
    };
    return response;
};

/**
 * Поиск в таблице columnlist
 * @param {BigInt} tableID - id таблицы tablelist.
 * @param {BigInt} id - id таблицы columnlist.
 * @returns {Object[]} Возвращает строки таблицы в виде объекта, типа: Ключ - Наименование столбца, значение - Содержимое столбца.
 */
async function columnListInfo({
    tableID,
    id
} = {}) {
    let response = {};
    let res = {};
    const client = await pool.connect();
    try {
        if (id) {
            res = await client.query('SELECT * FROM columnlist WHERE id = $1', [id]);
            response = res.rows[0];
        } else if (tableID) {
            res = await client.query('SELECT * FROM columnlist WHERE tableid = $1', [tableID]);
            response = res.rows;
        };
    } catch (error) {
        console.log(error.stack);
        response.Error = error.stack;
    } finally {
        client.release();
    };
    return response;
};
/*
async function create({
    tableID,
    columnList = {}
} = {}) {
    let response = {};
    let res = {};
    if (!tableID) return response.Error = 'tableID is null';

    let columns = '';
    let values = '';
    let variable = [];
    let id = 1;

    const client = await pool.connect();
    try {
        res = await client.query('SELECT * FROM document WHERE id = $1', [docID]);
        const docModel = res.rows[0];
        res = await client.query('SELECT * FROM doccolumn WHERE docid = $1', [docID]);
        const docColumnModel = res.rows;

        docColumnModel.forEach((row) => {
            //Пребираем объект
            Object.entries(docColumn).forEach(([key, value]) => {
                if (row.columnname == key) {
                    variable.push(value);
                    columns = columns == '' ? row.columnname : columns + ', ' + row.columnname;
                    values = values == '' ? '$' + id : values + ', ' + '$' + id;
                    id = id + 1;
                };
            });
        });
        //console.log('columns=', columns);
        //console.log('values=', values);
        //console.log('variable=', variable);

        const query = 'INSERT INTO ' + docModel.tablename + ' (' + columns + ') VALUES (' + values + ')';
        console.log('query=', query);
        await client.query(query, variable);

        res = await client.query('SELECT MAX(id) FROM ' + docModel.tablename);
        const newId = res.rows[0].max;
        //console.log('res=',res);
        const newDoc = await client.query('SELECT * FROM ' + docModel.tablename + ' WHERE id = $1', [newId]);
        response = newDoc.rows[0];
    } catch (error) {
        console.log(error.stack);
        response.Error = error.stack;
    } finally {
        client.release();
    };
    return response;
};
*/
/**
 * Создание новой строки в таблице tablelist.
 * @param {Object.<string, string>} columnList - значения в новой строке. Ключ - Наименование столбца, значение - Содержимое столбца.
 * @returns {Object.<string, string>} Возвращает новую строку таблицы tablelist в виде объекта, типа: Ключ - Наименование столбца, значение - Содержимое столбца.
 */
async function createTable(
    columnList = {}
) {
    let response = {};
    const client = await pool.connect();
    try {
        const doc = await client.query('SELECT MAX(id) FROM tablelist');
        const newId = doc.rows[0].max ? Number(doc.rows[0].max) + 1 : 1;
        //console.log('newId=', newId);
        let type;
        let name;
        if (columnList.type) { //Если явно указан тип таблицы: Документ(document), Справочник(dictionary)
            type = columnList.type;
            if (columnList.type == 'document') name = columnList.name ? columnList.name : 'Новый_документ' + newId;
            if (columnList.type == 'dictionary') name = columnList.name ? columnList.name : 'Новый_справочник' + newId;
        } else {
            name = columnList.name ? columnList.name : 'Новая_таблица' + newId;
        };
        const tableName = columnList.tableName ? columnList.tableName : 'newtable' + newId;
        const description = columnList.description ? columnList.description : '';
        const parent = columnList.parent ? columnList.parent : null;
        const variable = [name, tableName, description, parent, type];

        const query = `INSERT INTO tablelist (name, tableName, description, parent, type)
                        VALUES ($1, $2, $3, $4, $5)`;

        await client.query(query, variable);

        const newTable = await client.query('SELECT * FROM tablelist WHERE id = $1', [newId]);
        response = newTable.rows[0];

    } catch (error) {
        console.log(error.stack);
        response.Error = error.stack;
    } finally {
        client.release();
    };
    return response;
};

/**
 * Создание новой строки в таблице columnList.
 * @param {BigInt} tableID - id таблицы document.
 * @param {Object.<string, string>} columnList - значения в новой строке. Ключ - Наименование столбца, значение - Содержимое столбца.
 * @returns {Object.<string, string>} Возвращает новую строку таблицы columnList в виде объекта, типа: Ключ - Наименование столбца, значение - Содержимое столбца.
 */
async function createColumn({
    tableID,
    columnList = {}
} = {}) {
    let response = {};
    const client = await pool.connect();
    if (!tableID) return response.Error = 'tableID is null';
    try {
        const doc = await client.query('SELECT MAX(id) FROM columnList');
        const newId = doc.rows[0].max ? Number(doc.rows[0].max) + 1 : 1;
        //console.log('newId=', newId);
        const name = columnList.name ? columnList.name : 'Новый_столбец' + newId;
        const columnName = columnList.columnName ? columnList.columnName : 'newcolumn' + newId;
        const datatype = columnList.datatype ? columnList.datatype : 'TEXT';
        const description = columnList.description ? columnList.description : '';
        const variable = [name, columnName, datatype, description, tableID];

        const query = `INSERT INTO columnList (name, columnName, datatype, description, tableid)
                        VALUES ($1, $2, $3, $4, $5)`;

        await client.query(query, variable);

        const newColumn = await client.query('SELECT * FROM columnList WHERE id = $1', [newId]);
        response = newColumn.rows[0];

    } catch (error) {
        console.log(error.stack);
        response.Error = error.stack;
    } finally {
        client.release();
    };
    return response;
};



/**
 * Информация о таблице в БД
 * @param {Object.<string, string>} Content - Type: [table, view], Schema, Name, tableID.
 * @returns {Object.<string, string>} dbInfo: response.Exists, response.columnList
 */
async function dbInfo({
    Type,
    Schema,
    Name
} = {}) {
    let response = {};
    if (!Type) return response.Error = 'Type is null';
    if (!Name) return response.Error = 'Name is null';

    let variable = [];
    if (Schema) variable = [Name, Schema]
    else variable = [Name];
    let query = '';
    let resp = {};

    const client = await pool.connect();

    try {
        if (Type == 'table') {
            query = `SELECT EXISTS (
                SELECT 1
                FROM  information_schema.tables
                WHERE table_name = $1 `;
            if (Schema) query = query + ' AND table_schema = $2 '
            query = query + ')';
            //console.log('query=',query, Name);

            //resp = await pool.query('SELECT * FROM  information_schema.tables');
            //console.log('resp=', resp.rows);

            resp = await pool.query(query, variable);
            //console.log('resp=', resp.rows[0]);

            response.Exists = resp.rows[0].exists;

            if (response.Exists) {
                query = `SELECT column_name, column_default, is_nullable, data_type
                    FROM  information_schema.columns 
                    WHERE table_name = $1 `;
                if (Schema) query = query + ' AND table_schema = $2'
                resp = await pool.query(query, variable);
                //console.log('resp=',resp.rows);
                response.columnList = resp.rows;
            };
        };
    } catch (error) {
        console.log(error.stack);
        response.Error = error.stack;
    } finally {
        client.release();
    };
    return response;
};

/**
 * Работа с объектами в БД
 * @param {string} Type - тип объекта: table, view.
 * @param {string} Name - наименование объекта.
 * @param {string} Method - метод изменения: create, alter, drop.
 * @param {Object[]} columnList - значения объекта. Ключ - Наименование, значение - Содержимое.
 * @returns {Object.<string, string>} - информация: Message или Error.
 */
async function entityChange({
    Type,
    Name,
    Method,
    columnList
} = {}) {
    let response = {};
    let resp = {};
    let query = '';
    if (!Name) return response.Error = 'Name is null';

    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        if (Method == 'create') {
            if (Type == 'table') {
                query = 'CREATE TABLE ' + Name + ' ( id BIGSERIAL PRIMARY KEY )';
                resp = await pool.query(query);
                //console.log('resp=', resp);
                response.Message = 'SUCCESSFULLY: ' + query;
            };
        };
        if (Method == 'alter') {
            if (Type == 'table') {
                //Если есть columnList
                if (columnList) {
                    for await (const column of columnList) {
                        const _columnGet = columnGet(column);
                        if (_columnGet.Error) throw new UserException(_columnGet.Error);
                        query = 'ALTER TABLE ' + Name + ' ADD COLUMN ' + _columnGet.column;
                        console.log('query=', query);
                        resp = await pool.query(query);
                        //console.log('resp=', resp);
                        response.Message = 'SUCCESSFULLY: ' + query;
                    };
                };
            };
        };

        await client.query('COMMIT');
    } catch (error) {
        console.log(error.stack);
        response.Error = error.stack;
        await client.query('ROLLBACK');
    } finally {
        client.release();
    };
    return response;
};

function UserException(message) {
    this.message = message;
    this.stack = message;
    this.name = "Исключение, определённое пользователем";
}

/**
 * Возвращает описание полей через запятую
 * @param {Object.<string, string>} columnList - массив объектов с опиманием полей
 * @returns {Object.<string, string>} - response.Error или response.column
 */
function columnGet(column) {
    let response = {};
    if (!column) return response.Error = 'columnList is null';

    const columnname = column.columnname;
    if (!columnname) return response.Error = 'columnname is null';

    const datatype = column.datatype;
    if (!datatype) return response.Error = 'datatype is null';

    let allowNull = 'true'; // По умолчанию true
    if (column.allownull === undefined) allowNull = 'true'
    else if (!column.allownull) allowNull = 'false';
    if (allowNull == 'false') allowNull = ' NOT NULL '
    else allowNull = ' NULL ';

    let _default = column.default ? 'default ' + column.default : '';

    let unique = 'false'; //По умолчанию false
    if (column.unique === undefined) unique = 'false'
    else if (column.unique) unique = 'true';
    if (unique == 'true') unique = ' UNIQUE '
    else unique = '';

    unique = _default ? '' : unique; //Поля взаимоисключающие

    let references = ' ';
    if (column.references) {
        references = ' REFERENCES ' + column.references + ' ';
        allowNull = '';
        _default = '';
        unique = '';
    };

    const query = columnname + ' ' + datatype + references + allowNull + unique + _default;
    //console.log('query=', query);
    response.column = query;

    return response;
};

/**
 * Ищет данные в таблице docdictionary
 * @param {Bigint} docID id таблицы
 * @returns {Object.<string, string>} - response.Error или response.rows
 */
async function getDocDictionary({
    docID
} = {}) {
    let response = {};
    let res = {};
    const client = await pool.connect();
    try {
        if (docID) {
            res = await client.query('SELECT * FROM docdictionary WHERE id = $1', [docID]);
            response = res.rows[0];
        } else {
            res = await client.query('SELECT * FROM docdictionary');
            response = res.rows;
        };
    } catch (error) {
        console.log(error.stack);
        response.Error = error.stack;
    } finally {
        client.release();
    };
    return response;
};

/**
 * Создаёт строку в таблице docdictionary
 * @returns {Object.<string, string>} - response.Error или response.rows
 */
async function createDocDictionary({
    _name,
    _description
} = {}) {
    let response = {};
    let res = {};
    const client = await pool.connect();
    try {
        const doc = await client.query('SELECT MAX(id) FROM docdictionary');
        const newId = doc.rows[0].max ? Number(doc.rows[0].max) + 1 : 1;

        const name = _name ? _name : 'Новый_тип_докумена' + newId;
        const description = _description ? _description : '';
        const variable = [name, description];

        const query = `INSERT INTO docdictionary (name, description) VALUES ($1, $2)`;

        await client.query(query, variable);

        const newColumn = await client.query('SELECT * FROM docdictionary WHERE id = $1', [newId]);
        response = newColumn.rows[0];
    } catch (error) {
        console.log(error.stack);
        response.Error = error.stack;
    } finally {
        client.release();
    };
    return response;
};

module.exports = {
    //findByID,
    //findAll,
    //create,


    createTable,
    createColumn,
    tableInfo,
    columnListInfo,
    dbInfo,
    entityChange,
    getDocDictionary,
    createDocDictionary
};


/*
module.exports.getDocument = async ({
    docID,
    id
}) => {
    let response;
    try {
        let docs = [];
        const docModel = await prisma.document.findUnique({
            where: {
                id: Number(docID),
            },
        });
        //console.log('docModel=', docModel);

        const docModelName = docModel.tableName;
        if (!id) {
            docs = await prisma[docModelName].findMany();
        };
        console.log('docs=', docs);

        //Преобразуем JSON в текст
        response = JSON.stringify(resp);

    } catch (error) {
        console.error(error);
        response.Error = error;
    } finally {
        async () => {
            await prisma.$disconnect();
        };
    };
};



module.exports.get = async ( {    docModelName,    where,    columns}) => {
    let response = {};

    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        const queryText = 'SELECT NOW() as now';
        const res = await client.query(queryText);
        console.log('res=', res.rows[0]);
        //const queryText = 'INSERT INTO users(name) VALUES($1) RETURNING id'
        ///const res = await client.query(queryText, ['brianc'])
        //const insertPhotoText = 'INSERT INTO photos(user_id, photo_url) VALUES ($1, $2)'
        ////const insertPhotoValues = [res.rows[0].id, 's3.bucket.foo']
        //await client.query(insertPhotoText, insertPhotoValues)
        await client.query('COMMIT');
    } catch (e) {
        await client.query('ROLLBACK');
        throw e;
    } finally {
        client.release();
    };
     
    
    
    
    
    try {
        let docs = [];
        if (where && columns) {
            docs = await prisma[docModelName].findMany({
                where,
                select: columns
            });
        } else if (where) {
            docs = await prisma[docModelName].findMany({
                where
            });
        } else if (columns) {
            docs = await prisma[docModelName].findMany({
                select: columns
            });
        } else docs = await prisma[docModelName].findMany();

        // console.dir(docs, {depth: null});

        let resp = []
        docs.forEach((row) => {
            resp.push( //Собираем в массив объектов
                Object.fromEntries( // преобразовать в массив, затем map, затем fromEntries обратно объект
                    Object.entries(row).map(([key, value]) => [key, value ? value.toString() : value]) // Значения превращаем в строку .toString()
                ))
        });

        //console.log('resp=', resp);
        response = resp;


    } catch (error) {
        console.error(error);
        response.Error = error;
    } finally {
        async () => {
            await prisma.$disconnect();
        };
    };

    return response;
};
*/
/*
module.exports.create = async ({
    docModelName,
    docID,
    docColumns
}) => {
    let response = {};
    let _data = {};

    //console.log('docColumns=',docColumns);
    try {
        if (docModelName == 'document') {
            if (!docColumns) {
                //Ищем максимальный id
                const getMaxId = await prisma.document.findMany({
                    take: 1,
                    orderBy: {
                        id: "desc"
                    }
                });

                const maxId = (Number(getMaxId[0] ? getMaxId[0].id : 0) + 1).toString();

                _data = {
                    name: 'Новый документ' + maxId,
                    tableName: 'newTable' + maxId,
                    createdAt: new Date()
                };

                let resp = await prisma[docModelName].create({
                    data: _data
                });
            } else {
                for (const row of docColumns) {
                    _data = {
                        name: row.name,
                        tableName: row.tableName,
                        description: row.description,
                        parent: row.parent ? Number(row.parent) : null
                    };
                    //console.log('_data=', _data);
                    let resp = await prisma.document.update({
                        where: {
                            id: Number(row.id)
                        },
                        data: _data
                    });
                    //console.log('resp=', resp);
                };
            };
        };

        if (docModelName == 'docColumn') {
            //Дообогащаем объект _data
            //Object.keys(data).forEach((key) => _data[key] = data[key]);
            //console.log('_data=', _data);

            //Ищем максимальный id
            if (!docColumns) {
                const getMaxId = await prisma.docColumn.findMany({
                    take: 1,
                    orderBy: {
                        id: "desc"
                    }
                });

                const maxId = (Number(getMaxId[0] ? getMaxId[0].id : 0) + 1).toString();

                _data = {
                    name: 'Новое поле' + maxId,
                    columnName: 'newColumn' + maxId,
                    dataTypes: 'String',
                    createdAt: new Date(),
                    documentID: Number(docID)
                };
                const resp = await prisma.docColumn.create({
                    data: _data
                });
                //console.log('resp=', resp);
            } else {
                for (const row of docColumns) {
                    _data = {
                        name: row.name,
                        columnName: row.columnName,
                        dataTypes: row.dataTypes,
                        description: row.description,
                        documentID: Number(docID)
                    };
                    //console.log('_data=', _data);
                    let resp = await prisma.docColumn.update({
                        where: {
                            id: Number(row.id)
                        },
                        data: _data
                    });
                    //console.log('resp=', resp);
                };
            };
        };

    } catch (error) {
        console.error(error);
        response.Error = error;
    } finally {
        async () => {
            await prisma.$disconnect();
        };
    };

    return response;
};

module.exports.delete = async ({
    docModelName,
    docID,
    id
}) => {
    let response = {};
    //Превращаем в массив
    const arrID = id.split(',');

    try {
        for (const _id of arrID) {
            //console.log('_id=', _id);
            const del = await prisma[docModelName].delete({
                where: {
                    id: Number(_id)
                },
            });
            console.log('del=', del);
        };
    } catch (error) {
        console.error(error);
        response.Error = error;
    } finally {
        async () => {
            await prisma.$disconnect();
        };
    };
    return response;
};

*/