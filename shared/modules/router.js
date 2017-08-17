import P from 'page'
import {_force, getCollection, hub} from './'
import {dbID} from '../config'


class Router {

    route = null
    current = null

    constructor() {

        const Handler = this.handler.bind(this)

        P.base('/')

        P('/', Handler)
        P(':page', Handler)
        P(':page/:action', Handler)
        P(':page/:action/:id', Handler)
        P('*', Handler)

    }

    forceCache() {
        if (_force.size) {
            _force.forEach(coll => Reflect.set(coll, 'cacheInit', 0))
            _force.clear()
        }
    }

    handler(route) {

        this.forceCache()
        this.mapper(route)
        hub.emit('APP', {isInit: true})
    }

    mapper(route) {

        let {params} = route,
            {page = 'index'} = params,
            pages = getCollection('pages'),
            current = pages.by(dbID, page) || pages.by(dbID, '404')

        this.route = route
        this.current = current
    }


    start() {
        P.start(true)
    }

}


export const router = new Router
