// view
export {Component} from 'react'
export {render} from 'react-dom'
export {default as h} from 'react-hyperscript'


// sys
export {compose, guid} from './utils'
export {db, upsert, getCollection, schemes, clearSchema} from './db'
export {hub, hub$, app$, mess$} from './hub'
export {fetch} from './fetch'
export {router} from './router'
export {init} from './init'

// ioc
export const _refs = new Map
export const _force = new Set



// export {default as anime} from 'animejs'
