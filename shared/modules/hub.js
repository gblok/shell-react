import {eeOpts} from '../config'
import EventEmitter from 'eventemitter2'
import {fromEvent} from 'most'

export const hub = new EventEmitter(eeOpts)

export const hub$ = fromEvent('PUSH', hub).multicast()
export const app$ = fromEvent('APP', hub).multicast()
export const mess$ = fromEvent('MESSAGE', hub).timestamp().multicast()



// export const document$ = fromEvent('mousedown', document).multicast()
// export const documentKeys$ = fromEvent('keydown', document).multicast()