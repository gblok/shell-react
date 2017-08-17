import view from '../../controllers/pug'

export default router => {
    router.get(['/', '/:page', '/:page/:action', '/:page/:action/:id'], view())
}
