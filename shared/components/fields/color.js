import {Component, h} from '../../../shared/modules'
import {Svg} from '../../components'

export default class extends Component {


    render() {

        let {field} = this.props,
            {variants} = field,
            {field: name, label: fieldLabel, val = null} = field,
            onChange = e => {
                Reflect.set(field, 'val', e.target.value)
                this.forceUpdate()
            },
            dom = variants.map(v => {

                let {value, label} = v,
                    isActive = value === val


                return h('label', {className: value,}, [
                    h('input', {
                        name,
                        onChange,
                        type: 'radio',
                        value,
                        checked: isActive ? 'checked' : false
                    }),
                    h(Svg, {id: isActive ? 'radio-checked' : 'radio'}),
                    h('key', label)
                ])


            })


        return h('field', {className: 'color'}, [
            h('name', fieldLabel),
            h('variants', [dom]),
        ])

    }
}