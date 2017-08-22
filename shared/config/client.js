import path from 'path'
import {SOCKET_HOST, SOCKET_PORT} from './server'

export const IS_DEV = process.env.NODE_ENV === 'development'
export const IS_CLIENT = true
export const IS_SERVER = !IS_CLIENT

export const DEV_PORT = 8888


export const SOCKET = {
    url: `${SOCKET_HOST}}`,
    //opts: { transformer: 'uws' }
}


//paths
export const output = path.join(process.cwd(), 'static')
export const shared = path.join(process.cwd(), 'shared')
export const assets = path.join(output, 'assets')
export const dll = path.join(assets, 'dll', '[name].json')
export const vendor = path.join(assets, 'dll', 'vendor.json')
export const svg = path.join(output, 'svg')
export const exclude = path.resolve(process.cwd(), 'node_modules')


//2m = 120 000 ms
//5m = 300 000 ms
export const CACHE_LIFE_TIME = 600000


export const root = () => document.body
export const InitProps = Object.create(null)

export const dbName = 'app.db'
export const dbID = 'id'
export const dbCollOpts = {unique: [dbID]}

export const eeOpts = {
    // wildcard: true,
    // newListener: false,
    // delimiter: '.',
    // maxListeners: 1,
    verboseMemoryLeak: true
}

export const EMPTY = Object.create(null)


