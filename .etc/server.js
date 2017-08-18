global.IS_SERVER = true
global.IS_CLIENT = false

require('babel-polyfill')
require('babel-register')
require('../server/index.js')