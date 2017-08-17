import compose from 'koa-compose'
import Router from 'koa-router'
import importDir from 'import-dir'
import {EMPTY} from '../../shared/config/server'


export default config => {

    let {dir, opts = EMPTY} = config,
        router = new Router(opts),
        routes = importDir(dir)

    for (let name of Reflect.ownKeys(routes))
        routes[name](router)

    return compose([
        router.routes(),
        router.allowedMethods()
    ])
}


