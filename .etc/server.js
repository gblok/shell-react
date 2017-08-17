global.IS_SERVER = true
global.IS_CLIENT = false
require('babel-register')
require('babel-polyfill')
require('../server/index.js')