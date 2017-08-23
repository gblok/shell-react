import {Component, h} from '../../../shared/modules'
import {Svg} from '../../components'

export default class extends Component {


    render() {

        let {field} = this.props,
            {variants} = field,
            {field: name, label: fieldLabel, val= null} = field,
            onChange = e => {

                console.log(e.target.checked)

                this.forceUpdate()

            },
            dom = variants.map(v => {


                let {value, label} = v,
                    isActive = val && val.has(value) ? true : false

                console.log({val})


                return h('label', {className: value,}, [
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