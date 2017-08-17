import {hub$} from '../modules'
import {buildTx, checkSid, get} from '../modules/tx'
import {paginate} from '../modules/utils'

const def = {
    offset: 0,
    sort: null,
    desc: true
}


export const coll = target => class extends target {

    ask = new Set
    state = def


    componentWillReceiveProps() {
        this.state = def
    }


    componentDidMount() {

        hub$
            .filter(cid => this.ask.has(cid))
            .observe(() => this.forceUpdate())
    }


    $coll(tx) {

        let res = null


        if (tx) {

            let {cid, branch} = checkSid(tx, this.state),
                coll = get(tx)


            this.ask.add(cid)

            if (IS_CLIENT && Reflect.has(coll, 'isInit')) {


                let viewName = branch ? `${cid}_${JSON.stringify(branch)}` : cid,
                    dv = coll.getDynamicView(viewName) || branch
                        ? coll.addDynamicView(viewName).applyFind(branch)
                        : coll.addDynamicView(viewName)


                res = dv.branchResultset(buildTx(tx))

                this.pager = {
                    ...paginate({count: dv.count(), limit: tx.limit, offset: tx.offset}),
                    setActive: offset => this.setState({offset})
                }
            }


            if (IS_SERVER) {

                let viewName = branch ? `${cid}_${JSON.stringify(branch)}` : cid,
                    dv = coll.getDynamicView(viewName) || branch
                        ? coll.addDynamicView(viewName).applyFind(branch)
                        : coll.addDynamicView(viewName)


                res = dv.branchResultset(buildTx(tx))

                this.pager = {
                    ...paginate({count: dv.count(), limit: tx.limit, offset: tx.offset}),
                    setActive: offset => this.setState({offset})
                }
            }


        }

        return res


    }
}
