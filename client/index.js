import 'babel-polyfill'
/// import WebFont from 'webfontloader'
import {h, render} from '../shared/modules'
import {Shell} from '../shared/components'
import {googleFont, InitProps, root} from '../shared/config'

// (() => {
//
//     WebFont.load({google: googleFont})
//
//
// })()

render(h(Shell, InitProps), root())

// render(h(Shell, InitProps), root())
//import {InitProps, root} from '../shared/config'
//import 'url-search-params-polyfill'
//import '../shared/modules/polyfills/closets'

