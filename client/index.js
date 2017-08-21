import 'babel-polyfill'
import {h, render} from '../shared/modules'
import {Shell} from '../shared/components'
import {InitProps, root} from '../shared/config'

render(h(Shell, InitProps), root())


/*

 import WebFont from 'webfontloader'
(() => {
    WebFont.load({google: googleFont})
})()

*/


// render(h(Shell, InitProps), root())
//import {InitProps, root} from '../shared/config'
//import 'url-search-params-polyfill'
//import '../shared/modules/polyfills/closets'

