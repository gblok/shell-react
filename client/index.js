import '@babel/polyfill'
import {h, render, hydrate} from '../shared/modules'
import {Shell} from '../shared/components'
import {InitProps, root} from '../shared/config'



// if ('serviceWorker' in navigator) {
//
//     navigator.serviceWorker.register('/sw.js', {scope: '/'})
//         .then(reg => console.log(`sw register, ${reg.scope}`))
//         .catch(err => console.error(`registration failed with ${err}`))
//
//
//     document.addEventListener('beforeinstallprompt', e => {
//
//         e.userChoice
//             .then(choiceResult => {
//
//                 console.log('choiceResult', choiceResult.outcome)
//
//                 choiceResult.outcome == 'dismissed'
//                     ? console.log('User cancelled home screen install')
//                     : console.log('User added to home screen')
//             })
//     })
//
// }



hydrate(h(Shell, InitProps), root())


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

