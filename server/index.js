import Koa from 'koa'
import {API, APP, PORT, STATIC} from '../shared/config/server'
import middleware from './middleware'
import routes from './routes'
import {init} from '../shared/modules/init'


const app = new Koa

init()

app
    .use(middleware())
    .use(routes(API))
    .use(routes(APP))
    .use(ctx => ctx.status = 404)
    .listen(PORT, () => console.log(`${String.fromCharCode(9763)} ${PORT}`))


//ToDo ws example

// const primus = new Primus(app, {transformer: 'uws'})
// import Primus from 'Primus'
// //primus.library()
// primus.save(`${STATIC}/assets/js/ws.js`)
//
// primus.on('connection', spark => {
//     console.log('connection')
// })
//
// primus.on('disconnection',  spark =>{
//     console.log('disconnection')
// })