//app.listen()
module.exports.main_port = 3001;

module.exports.dbConfig ={
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
