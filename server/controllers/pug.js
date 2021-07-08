import pug from 'pug'
import {resolve} from 'path'
import {VIEWS} from '../../shared/config/server'
import {Shell} from '../../shared/components'
import {h, router} from '../../shared/modules'
import {InitProps} from '../../shared/config'
import {renderToStaticMarkup} from 'react-dom/server'


const
    viewPath = resolve(VIEWS, 'base.pug'),
    tpl = pug.compileFile(viewPath, {doctype: 'html'})


export default () => async ctx => {

    console.time('render')

    let {params} = ctx

    router.mapper({params})

    let root = await renderToStaticMarkup(h(Shell, InitProps))

    ctx.body = await tpl({root})

    console.timeEnd('render')
}