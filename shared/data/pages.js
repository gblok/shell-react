export default [
    {
        id: 'index',
        parent: null,
        title: 'Home',
        layout: ['Home']
    },
    {
        id: '404',
        parent: 'index',
        title: 'Error',
        layout: ['Error']
    },
    {
        id: 'products',
        icon: 'products',
        parent: 'index',
        title: 'Products',
        layout: ['Products']
    }
]




