import path from 'path'

export const PORT = 8787

export const SOCKET_HOST = `127.0.0.1`
export const SOCKET_PORT = PORT


export const STATIC = path.resolve(process.cwd(), 'static')
export const VIEWS = path.resolve(process.cwd(), 'server', 'views')


export const EMPTY = Object.create(null)

export const API = {dir: './api', opts: {prefix: '/api'}}
export const APP = {dir: './app'}

export const allowCollections = ['products']