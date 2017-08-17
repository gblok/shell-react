import 'babel-polyfill'
import WebFont from 'webfontloader'
import {h, render} from '../shared/modules'
import {Shell} from '../shared/components'

import {InitProps, googleFont, root} from '../shared/config'


render(h(Shell, InitProps), root())

/*WebFont.load(
    {
        google: googleFont,
        active: () => render(h(Shell, InitProps), root())
    }
)*/


//import {InitProps, root} from '../shared/config'
//import 'url-search-params-polyfill'
//import '../shared/modules/polyfills/closets'

