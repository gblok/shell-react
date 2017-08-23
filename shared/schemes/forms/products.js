export default {
    cid: 'products',
    fields: [
        {
            field: 'name',
            label: 'Product name',
            type: 'text',
            validation: 'req|min,4|max,8|isAlphaNumeric,en-US'
        },
        {
            field: 'color',
            label: 'Product color',
            multi: true,
            validation: 'req',
            type: 'multiColor',
            variants: [
                {value: 'red', label: 'red'},
                {value: 'green', label: 'green'},
                {value: 'blue', label: 'blue'}
            ]
        }
    ]
}