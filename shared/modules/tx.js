import * as R from '../reducers'
import {CACHE_LIFE_TIME, dbID} from '../config'
import {_force, fetch, getCollection, hub, schemes, upsert} from '../modules'

const Obj = Object.create(null)

export const buildTx = tx => {

    let arr = [],
        {
            limit = null,
            offset = null,
            sort = null,
            desc = true
        } = tx


    if (sort)
        arr.push({
            type: 'simplesort',
            property: sort,
            desc
        })


    if (offset)
        arr.push({
            type: 'offset',
            value: offset
        })


    if (limit)
        arr.push({
            type: 'limit',
            value: limit
        })


    return arr

}


export const getTune = cid => Reflect.has(R, cid)
    ? Reflect.get(R, cid)
    : Reflect.get(R, 'duty')


export const checkSid = (tx, state) => {

    let {sid = null} = tx,
        schema = Obj

    if (sid)
        schema = schemes.by(dbID, sid)


    return Object.assign(tx, schema, state)
}


export const handler = (tx, res = null) => {

    if (res) {

        let {cid, force = false} = tx,
            isMulti = Array.isArray(res),
            coll = getCollection(cid),
            tune = getTune(cid)

        isMulti
            ? res.forEach(doc => upsert(coll, tune({tx, doc})))
            : upsert(coll, tune({tx, doc: res}))


        if (force)
            _force.add(coll)


        Object.assign(coll, {
            isInit: 1,
            isPending: 0,
            cacheInit: Date.now()
        })


        hub.emit('PUSH', cid)

        return coll

    }
}


export const seed = async tx => handler(tx, await fetch(tx))


export const get = tx => {


    let {cid} = tx,
        coll = getCollection(cid),
        {cacheInit = 0} = coll,
        delta = Date.now() - cacheInit


    if (IS_CLIENT && delta > CACHE_LIFE_TIME)
        seed(tx)
            .catch(console.error)

    return coll

}
