import {getCollection, hub, fetch} from '../modules'
import page from 'page'
import {dbID} from '../config/client'



export const REMOVE = async (cid, doc) => {

    await fetch({
        method:'delete',
        uri: `/api/${cid}`,
        formData: {[dbID]: Reflect.get(doc, dbID)}
    })

    let coll =getCollection(cid)
    coll.remove(doc)
    hub.emit('PUSH', cid)
    ROUTE(`/${cid}`)
}



export const EDIT = (cid, doc) => page(`/${cid}/edit/${Reflect.get(doc, dbID)}`)
export const CREATE = cid => ROUTE(`/${cid}/create`)


export const ROUTE = uri => page(uri)
