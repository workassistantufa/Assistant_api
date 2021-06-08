const pg = require('pg');

function DocClass(docId)
{
// docId код документа 
    this.docId=docId // код документа
    this.point='' //имя таблицы,какую таблицу считать главной
    this.rowId=null // код строки, относительно которой будут грузиться зависимые данные


}




module.exports = {
    //findByID,
    //findAll,
    //create,


    DocClass
};
