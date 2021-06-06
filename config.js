//app.listen()
module.exports.main_port = 3001;

module.exports.dbConfig = {
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'assistant',
  port: 5432,
}

//Подключение к БД sqlite3/main.db Windows
/*module.exports.dbConfig = {
    dialect: 'sqlite',
    storage: './sqlite/main.db'
};
*/

//jsdoc
//jsdoc app.js -c out/conf.json -r


//sendMail Настройки отправки почты, от имени кого отправлять
module.exports.sendMail_host = 'smtp.yandex.ru';
module.exports.sendMail_port = 465;
module.exports.sendMail_secure = true;
module.exports.sendMail_user = "kkdinar@yandex.ru";
module.exports.sendMail_pass = "q*159753";

//Телеграмм БОТ workAssistantBot
module.exports.bot_chat_id = '1428565883';
module.exports.bot_token = '1428565883:AAEaSPndJe4RC3-dF-YQ-lsYTfX_1I7IYQ8';
//400738545 Хабибуллин chat_id 
module.exports.kdinar_chat_id = '400738545';
//Группа Башпринт Ассистент
module.exports.group_chat_id = '-431221987';

module.exports.tableList_get = () => {
  let columnList = [];
  columnList[0] = {
    columnname: 'name',
    datatype: 'text',
    allownull: false
  };
  columnList[1] = {
    columnname: 'tablename',
    datatype: 'text',
    allownull: false,
    unique: true
  };
  columnList[2] = {
    columnname: 'description',
    datatype: 'text',
  };
  columnList[3] = {
    columnname: 'parent',
    datatype: 'bigint',
  };
  columnList[4] = {
    columnname: 'createdat',
    datatype: 'timestamp',
    allownull: false,
    default: ' NOW() '
  };
  columnList[5] = {
    columnname: 'updatedat',
    datatype: 'timestamp',
    allownull: false,
    default: ' NOW() '
  };
  //Тип таблицы: Документ(document), Справочник(dictionary)
  columnList[6] = {
    columnname: 'type',
    datatype: 'text',
  };
  const tablelist = {
    tablename: 'tablelist',
    columnList
  };
  return tablelist;
};

module.exports.columnList_get = () => {
  let columnList = [];
  columnList[0] = {
    columnname: 'name',
    datatype: 'text',
    allownull: false
  };
  columnList[1] = {
    columnname: 'columnname',
    datatype: 'text',
    allownull: false
  };
  columnList[2] = {
    columnname: 'datatype',
    datatype: 'text',
    allownull: false
  };
  columnList[3] = {
    columnname: 'description',
    datatype: 'text',
  };
  columnList[4] = {
    columnname: 'createdat',
    datatype: 'timestamp',
    allownull: false,
    default: ' NOW() '
  };
  columnList[5] = {
    columnname: 'updatedat',
    datatype: 'timestamp',
    allownull: false,
    default: ' NOW() '
  };
  columnList[6] = {
    columnname: 'tableid',
    datatype: 'bigserial',
    allownull: false,
    references: 'tablelist (id)'
  };
  const tablelist = {
    tablename: 'columnlist',
    columnList
  };
  return tablelist;
};

module.exports.docDictionary_get = () => {
  let columnList = [];
  columnList[0] = {
    columnname: 'name',
    datatype: 'text',
    unique: true
  };
  columnList[1] = {
    columnname: 'description',
    datatype: 'text'
  };
  columnList[2] = {
    columnname: 'createdat',
    datatype: 'timestamp',
    allownull: false,
    default: ' NOW() '
  };
  columnList[3] = {
    columnname: 'createduser',
    datatype: 'text'
  };
  columnList[4] = {
    columnname: 'updatedat',
    datatype: 'timestamp',
    allownull: false,
    default: ' NOW() '
  };
  columnList[5] = {
    columnname: 'updateduser',
    datatype: 'text'
  };
  const tablelist = {
    tablename: 'docdictionary',
    columnList
  };
  return tablelist;
};

module.exports.movement_get = () => {
  let columnList = [];
  columnList[0] = {
    columnname: 'parent',
    datatype: 'bigint'
  };
  columnList[1] = {
    columnname: 'docid',
    datatype: 'bigint',
    allownull: false,
    references: 'docdictionary (id)'
  };
  columnList[2] = {
    columnname: 'createdat',
    datatype: 'timestamp',
    allownull: false,
    default: ' NOW() '
  };
  columnList[3] = {
    columnname: 'createduser',
    datatype: 'text'
  };
  columnList[4] = {
    columnname: 'updatedat',
    datatype: 'timestamp',
    allownull: false,
    default: ' NOW() '
  };
  columnList[5] = {
    columnname: 'updateduser',
    datatype: 'text'
  };
  const tablelist = {
    tablename: 'movement',
    columnList
  };
  return tablelist;
};

