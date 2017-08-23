import {Component, h,} from '../../modules'
import {coll} from '../../decorators/coll'
import {Icon, Loader} from '../../components'
import {CREATE, EDIT, REMOVE} from '../../actions'
import {Formats} from '../../modules/formats'

@coll
export default class extends Component {


    buildHead(tx, coll) {

        let {sort, desc} = this.state,
            {cols} = tx,
            isSortable = coll.count() > 1,
            row = cols.map(col => {

                let {label, field, align = null} = col,
                    isActive = sort === field,
                    colName = field.toLowerCase(),
                    className = isActive ? `active _${colName}` : colName,
                    isActions = colName === '_actions',
                    onMouseDown = isActions ? null : isSortable ? e => this.setState({sort: field, desc: !desc}) : null,
                    icon = isActions ? null : h(Icon, {
                            id:
                                isActive
                                    ? desc ? 'arrow-down' : 'arrow'
                                    : 'arrow-down'
                        }
                    )


                if (isSortable)
                    className += ` sort`


                if (align)
                    className += ` ${align}`


                return h('th', {className, onMouseDown}, [
                    h('span', label),
                    isSortable ? icon : null
                ])
            })

        return h('tr', row)
    }


    buildBody(tx, rows) {

        let {cols, cid} = tx,
            dom = []

        for (let doc of rows.data()) {
            let row = cols.map(col => {

                let {label, field, format = null, align = null} = col,
                    colName = field.toLowerCase(),
                    isActions = colName === '_actions',
                    cell = isActions
                        ? [
                            h('button', {
                                key: field + 'edit',
                                title: 'edit',
                                className: 'action',
                                onMouseDown: e => EDIT(cid, doc)
                            }, [h(Icon, {id: 'edit'})]),
                            h('button', {
                                key: field + 'remove',
                                title: 'remove',
                                className: 'action',
                                onMouseDown: e => REMOVE(cid, doc)
                            }, [h(Icon, {id: 'trash'})])
                        ]
                        : Reflect.get(doc, field)


                if (format && Formats.has(format))
                    cell = Formats.get(format)(col, cell)


                let className = colName

                if (align)
                    className += ` ${align}`


                return h('td', {className, 'data-label': label}, [h('span', [cell])])
            })
            dom.push(h('tr', row))
        }


        return dom


    }

    render() {


        let {tx} = this.props,
            coll = this.$coll(tx),
            msg = null,
            header = null,
            table = h(Loader)


        if (coll) {


            let {legend = '', cid} = tx,
                isEmpty = !Boolean(coll.count()),
                head = h('thead', [this.buildHead(tx, coll)]),
                body = h('tbody', this.buildBody(tx, coll))

            if (isEmpty)
                msg = h('success', 'Empty Collection')


            header = h('header', [
                h('h2', [legend || 'legend', h('amount', coll.count())]),
                h('button', {key:'createItem', onMouseDown: e => CREATE(cid)}, 'create')
            ])

            table = h('table', {className: 'grid'}, [head, body])
        }


        return h('section', [header, table, msg])

    }

}
