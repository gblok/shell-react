

import Koa from 'koa'
import {API, APP, PORT} from '../shared/config/server'
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

// export default app