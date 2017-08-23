export default {
    cid: 'products',
    fields: [
        {
            field: 'name',
            label: 'Product name',
            type: 'text',
            validation: 'req|min,2|max,10'
        },
        {
            field: 'color',
            label: 'Product color',
            type: 'multiColor',
            validation: 'req',
            variants: [
                {value: 'red', label: 'red'},
                {value: 'green', label: 'green'},
                {value: 'blue', label: 'blue'}
            ]
        }
    ]
}