import {getCollection, guid} from '../../../shared/modules'
import {dbID, EMPTY} from '../../../shared/config'
import {allowCid} from '../../middleware'

const removeMeta = doc => {

    let res = Object.assign({}, doc)

    Reflect.deleteProperty(res, '$loki')
    Reflect.deleteProperty(res, 'meta')
    return res
}


export default router => {

    router
        .get('/', async ctx => ctx.body = ['Hello There'])
        .get('/:cid', allowCid, async ctx => ctx.body = getCollection(ctx.params.cid).chain().data({removeMeta: true}))
        .get('/:cid/:id', allowCid, async ctx => {

            let {params: {cid, id}} = ctx,
                coll = getCollection(cid),
                doc = coll.by(dbID, id) || null

            doc
                ? ctx.body = removeMeta(doc)
                : ctx.throw(400)


        })
        .post('/:cid', allowCid, async ctx => {

            let {params: {cid}, response} = ctx,
                {name = null, color = null} = ctx.request.body,
                coll = getCollection(cid),
                id = guid(),
                doc = {id, name, color}


            if (doc && name && color) {
                coll.insertOne(doc)
                response.status = 201
                ctx.body = removeMeta(doc)
            }
            else {
                ctx.throw(400)
            }


        })
        .put('/:cid', allowCid, async ctx => {

            let {params: {cid}, response} = ctx,
                {id, name, color} = ctx.request.body,
                coll = getCollection(cid),
                doc = coll.by(dbID, id) || null


            if (doc && name && color) {

                coll.update(Object.assign(doc, {name, color}))
                response.status = 202
                ctx.body = removeMeta(doc)
            }
            else {
                ctx.throw(400)
            }


        })
        .delete('/:cid', allowCid, async ctx => {


            let {params: {cid}, response} = ctx,
                {id} = ctx.request.body,
                coll = getCollection(cid),
                doc = coll.by(dbID, id) || null


            if (doc) {

                coll.remove(doc)
                response.status = 204
                ctx.body = EMPTY

            } else {
                ctx.throw(400)
            }

        })


}
