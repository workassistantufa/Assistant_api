const Koa = require('koa');
const app = new Koa();

const Router = require('@koa/router');
const router = new Router();

const bodyParser = require('koa-bodyparser');
app.use(bodyParser());

const cors = require('koa-cors');
//app.use(cors());//prod закоментить

const config = require('./config.js');
const routes = require('./scripts/routes.js');

/**
 * Метод get для корневого элемента "/". Вызывается routes.get_api.
 * @function routes.get_api
 */
router.get("/", routes.get_api);

router.get("/api", routes.get);

router.post("/api", routes.post);

router.delete("/api", routes.delete);

router.get("/migrateDB", routes.migrateDB); 

router.get("/visualization", routes.visualization);

app.use(router.routes())

app.listen(config.main_port);