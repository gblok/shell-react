import {Component, h} from '../../../shared/modules'
import {Svg} from '../../components'

export default class extends Component {


    render() {

        let {field} = this.props,
            {variants} = field,
            {field: name, label: fieldLabel, val} = field

        console.log('field',{val})

        let onChange = e => {

                let value = e.target.value

                e.target.checked
                    ? val.add(value)
                    : val.delete(value)

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

        return h('field', {className: 'color'}, [
            h('name', fieldLabel),
            h('variants', [dom]),
        ])

    }
}