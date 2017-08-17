import {renderToString} from 'react-dom/server'
import {Shell} from '../../shared/components'
import {h} from '../../shared/modules'
import {InitProps} from '../../shared/config'


export default () => async ctx => {

    console.time('render')

    let html = `<!DOCTYPE html><html><body>`
    html += await renderToString(h(Shell, InitProps))
    html += `<script src="/assets/js/vendor.js"></script><script src="/assets/js/client.js"></script>`
    html += `</body></html>`

    ctx.body = html

    console.timeEnd('render')

}
