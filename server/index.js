import Koa from 'koa'
import Primus from 'Primus'
import {API, APP, PORT} from '../shared/config/server'
import middleware from './middleware'
import routes from './routes'
import {init} from '../shared/modules'
import http from 'http'

const app = new Koa


init()

app
    .use(middleware())
    .use(routes(API))
    .use(routes(APP))
// .use(ctx => ctx.status = 404)
//.listen(PORT, () => console.log(`${String.fromCharCode(9763)} ${PORT}`))


const server = http.createServer(app.callback()),
    primus = new Primus(server, {transformer: 'uws'})

primus.library()


primus.on('initialised', () => console.log('initialised'))


primus.on('connection', spark => {
    spark.on('data', function received(data) {
        console.log(spark.id, 'received message:', data)
        //spark.write(data)
        primus.write(data)
    })

})


server.listen(PORT, () => console.log(`${String.fromCharCode(9763)} ${PORT}`))


