import 'babel-polyfill'
import {h, render} from '../shared/modules'
import {Shell} from '../shared/components'
import {InitProps, root} from '../shared/config'


if ('serviceWorker' in navigator) {


    navigator.serviceWorker.register('/sw.js', {scope: '.'})
        .then(reg => {
            if (reg.installing) {
                console.log('Service worker installing')
            } else if (reg.waiting) {
                console.log('Service worker installed')
            } else if (reg.active) {
                console.log('Service worker active')
            }
        })
        .catch(err => console.error(`Registration failed with ${err}`))


}


render(h(Shell, InitProps), root())


// {scope: '/', insecure: true}
/// import WebFont from 'webfontloader'
// (() => {
//
//     WebFont.load({google: googleFont})
//
//
// })()
//
// render(h(Shell, InitProps), root())
//import {InitProps, root} from '../shared/config'
//import 'url-search-params-polyfill'
//import '../shared/modules/polyfills/closets'

