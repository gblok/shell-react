import pug from 'pug'
import path from 'path'
import {VIEWS} from '../../shared/config/server'
import {renderToString} from 'react-dom/server'
import {Shell} from '../../shared/components'
import {h, router} from '../../shared/modules'
import {InitProps} from '../../shared/config'


const
    viewPath = path.resolve(VIEWS, 'base.pug'),
    tpl = pug.compileFile(viewPath, {doctype: 'html'})


export default () => async ctx => {

    console.time('render')

    let {params} = ctx

    router.mapper({params})

    let root = await renderToString(h(Shell, InitProps))

    ctx.body = await tpl({root})

    console.timeEnd('render')
}