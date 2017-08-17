import Loki from 'lokijs'
import {dbCollOpts, dbID, dbName} from '../config'



function initDb (){

    function databaseInitialize() {
        console.log(`databaseInitialize`)
    }


    const dbOpts = {
        autoloadCallback: databaseInitialize,
        verbose: true,
    }

    if (IS_SERVER) {

        const lfsa = require('lokijs/src/loki-fs-structured-adapter')

        Object.assign(dbOpts, {
            adapter: new lfsa,
            autoload: true,
            autosave: true,
            autosaveInterval: 4000
        })

    }

    return new Loki(dbName, dbOpts)
}

export const db = initDb()
export const schemes = db.addCollection('schemes', dbCollOpts)
export const getCollection = cid => db.getCollection(cid) || db.addCollection(cid, dbCollOpts)

export const upsert = (coll, doc) => {

    if (Reflect.has(doc, dbID)) {
        let curr = coll.by(dbID, doc[dbID])
        curr
            ? coll.update(Object.assign(curr, doc))
            : coll.insertOne(doc)
    }
}

export const clearSchema = schema => JSON.parse(JSON.stringify(schema))
