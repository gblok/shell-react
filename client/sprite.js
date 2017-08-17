import sprite from 'svg-sprite-loader/runtime/browser-sprite.build'
let symbols = require.context('../static/svg', true, /\.svg/)
symbols.keys().forEach(k => sprite.add(symbols(k).default))