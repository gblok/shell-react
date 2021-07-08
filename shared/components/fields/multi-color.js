import {Component, h} from '../../../shared/modules'
import {Svg} from '../../components'

export default class extends Component {


    render() {

        let {field} = this.props,
            {field: name, label: fieldLabel, isInvalid, val, validate = null, errors = null, variants} = field,
            error = isInvalid ? h('error', errors ? errors.values().next().value : 'error') : null


        //console.log({val})


        let onChange = e => {

                e.target.checked
                    ? val.add(e.target.value)
                    : val.delete(e.target.value)

                if (validate)
                    validate()

                this.forceUpdate()
            },
            dom = variants.map(v => {

                let {value, label} = v,
                    isActive = val.has(value)


                return h('label', {className: value}, [
                    h('input', {
                        name,
                        onChange,
                        type: 'checkbox',
                        value,
                        checked: isActive ? 'checked' : false
                    }),
                    h(Svg, {id: isActive ? 'checkbox-checked' : 'checkbox'}),
                    h('key', label)
                ])
            })

        return h('field', {className: isInvalid ? 'invalid color' : 'color'}, [
            h('name', fieldLabel),
            h('variants', [dom]),
            error
        ])

    }
}