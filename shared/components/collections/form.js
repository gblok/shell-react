import {Component, fetch, getCollection, h, schemes, upsert} from '../../modules'
import {dbID} from '../../config'
import * as Fields from '../../components/fields'
import {bindValidate} from '../../modules/validator'
import {Icon} from '../../components'
import {ROUTE} from '../../actions'


const delay = ms => new Promise(r => setTimeout(r, ms))

export default class extends Component {

    state = {
        isPending: false,
        isSuccess: false,
        isValid: true
    }

    componentWillMount() {
        this.clear()
    }

    get schema() {
        let {tx: {sid}} = this.props
        return schemes.by(dbID, sid)
    }

    get fields() {
        return Reflect.get(this.schema, 'fields')
    }

    get formData() {

        let formData = Object.create(null)

        for (let {field, val, multi = null} of this.fields)
            Reflect.set(formData, field, multi ? Array.from(val.values()).sort() : val)

        return formData
    }


    clear() {
        for (let field of this.fields) {
            Reflect.deleteProperty(field, 'val')
            Reflect.deleteProperty(field, 'isInvalid')
            Reflect.deleteProperty(field, 'errors')
        }
    }

    onSubmit = e => {

        e.preventDefault()

        this.validation()
            ? this.send().catch(console.error)
            : false

        // this.setState({isValid: false})
    }


    validation() {
        return this.fields.every(f => f.validate())
    }


    async send() {


        let {doc = null} = this.props,
            {cid} = this.schema,
            formData = this.formData,
            isSuccess = false,
            coll = getCollection(cid)


        // optimistic update
        if (doc) {
            Reflect.set(formData, dbID, Reflect.get(doc, dbID))
            upsert(coll, Object.assign(doc, formData))
        }


        this.setState({isPending: true})


        let res = await fetch({
            method: doc ? 'put' : 'post',
            uri: `/api/${cid}`,
            formData
        })


        // server sync update
        if (res) {
            isSuccess = true
            upsert(getCollection(cid), res)
        }


        await delay(1000)
        this.setState({isSuccess, isPending: false})

    }


    render() {

        let {doc = null} = this.props,
            {isPending, isSuccess, isValid} = this.state,
            {fields, cid} = this.schema,
            dom = [],
            content = null


        const buildField = field => {

            let {type = null, field: fieldName, multi = null} = field,
                tag = Reflect.has(Fields, type) ? Reflect.get(Fields, type) : Reflect.get(Fields, 'text')

            if (multi && !Reflect.has(field, 'val'))
                Reflect.set(field, 'val', new Set)


            if (doc && Reflect.has(doc, fieldName)) {
                let val = Reflect.get(doc, fieldName)
                Reflect.set(field, 'val', multi ? new Set([...val]) : val)
            }


            bindValidate(field)

            return h(tag, {field})
        }

        const buildActions = () => h('button', {key: cid + 'submit', disabled: isValid ? false : 'disabled'}, 'Submit')


        if (isSuccess) {

            content = h('success', [
                h('svg', {id: 'successAnimation', className: 'animated', width: 70, height: 70, viewBox: '0 0 70 70'}, [
                    h('path', {
                        id: 'successAnimationResult',
                        fill: '#ddd',
                        d: 'M35,60 C21.1928813,60 10,48.8071187 10,35 C10,21.1928813 21.1928813,10 35,10 C48.8071187,10 60,21.1928813 60,35 C60,48.8071187 48.8071187,60 35,60 Z M23.6332378,33.2260427 L22.3667622,34.7739573 L34.1433655,44.40936 L47.776114,27.6305926 L46.223886,26.3694074 L33.8566345,41.59064 L23.6332378,33.2260427 Z'
                    }),
                    h('circle', {
                        id: 'successAnimationCircle',
                        cx: 35,
                        cy: 35,
                        r: 24,
                        stroke: '#888',
                        strokeWidth: '2',
                        strokeLinecap: 'round',
                        fill: 'transparent'
                    }),
                    h('polyline', {
                        id: 'successAnimationCheck',
                        stroke: '#888',
                        strokeWidth: 2,
                        points: '23 34 34 43 47 27',
                        fill: 'transparent'
                    })
                ]),
                h('h1', `Success!`),
                //h('p',  `...`),
                h('description', [
                    h('button', {onMouseDown: e => ROUTE(`/${cid}`)}, [
                        `Check out collection`,
                        h(Icon, {id: 'chevron-right'})
                    ])
                ])

            ])


        } else {

            if (isPending) {
                dom.push(h('.load-bar', [h('.b'), h('.b'), h('.b')]))
                dom.push(h('bumper'))
            }


            dom.push(fields.map(buildField))
            dom.push(buildActions())

            content = h('form', {
                onSubmit: this.onSubmit,
                tabIndex: 0
            }, [dom])
        }

        return content
    }

}