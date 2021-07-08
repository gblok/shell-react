import {router} from './'
import {handler} from './tx'
import {filterEsModule} from './utils'

import * as Schemes from '../schemes'
import * as PreloadData from '../data'


export const init = () => {


    // console.log('init', {IS_CLIENT})

    filterEsModule(PreloadData)
        .forEach(cid => {

            if (['pages', 'products'].includes(cid))
                handler({cid}, PreloadData[cid])
            console.log({cid})

        })

    filterEsModule(Schemes)
        .forEach(id => handler({cid: 'schemes'}, {id, ...Schemes[id]}))


    // console.log('__init', {IS_CLIENT})

    return IS_CLIENT ? router.start() : false
}
