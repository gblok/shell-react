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
            format: 'multiTag',
            multi: true,
            align: 'center'
        },
        {
            field: '_actions',
            label: 'Actions'
        }
    ]
}