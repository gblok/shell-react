import {getCollection, h} from '../../modules'
import {Form, Grid, PageError} from '../../components'
import {router} from '../../modules/router'
import {dbID} from '../../config'

const allow = ['create', 'edit']

export default props => {

    let {route: {params}} = router,
        {page: cid, action = null, id = null} = params,
        error = h(PageError, {message: 'Action is Disallowed'}),
        doc = null


    if (id) {

        let coll = getCollection(cid)
        doc = coll.by(dbID, id) || null
        if (!doc)
            return h(PageError, {message: 'Page Not Found'})
    }


    return action
        ? allow.includes(action)
            ? h(Form, {tx: {sid: 'FormProducts'}, doc})
            : error
        : h(Grid, {tx: {sid: 'GridProducts'}})

}