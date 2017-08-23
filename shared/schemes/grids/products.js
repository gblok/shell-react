export default {
    cid: 'products',
    legend: 'Products',
    cols: [
        {
            field: 'id',
            label: 'Id',
        },
        {
            field: 'name',
            label: 'Name',
        },
        {
            field: 'color',
            label: 'Color',
            multi: true,
            format: 'multiTag',
            align: 'center'
        },
        {
            field: '_actions',
            label: 'Actions'
        }
    ]
}