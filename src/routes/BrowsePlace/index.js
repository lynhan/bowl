module.exports = {
    path: '/browseplaces',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('./components/BrowsePlace'))
        })
    },
}