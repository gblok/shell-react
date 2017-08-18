import compose from 'koa-compose'
import logger from 'koa-logger'
import serve from 'koa-static'
import compress from 'koa-compress'
import etag from 'koa-etag'
import favicon from 'koa-favicon'
import helmet from 'koa-helmet'
import bodyParser from 'koa-bodyparser'
import {allowCollections, STATIC} from '../../shared/config/server'
//import cors from 'koa2-cors'

export default () => compose([
    compress(),
    bodyParser({
        extendTypes: {
            json: ['application/x-javascript']
        }
    }),
    etag(),
    serve(STATIC),
    favicon(),
    helmet(),
   // cors(),
    logger()
])


export async function allowCid(ctx, next) {

    allowCollections.includes(ctx.params.cid)
        ? await next()
        : (ctx.throw(400), ctx.body = Object.create(null))
}