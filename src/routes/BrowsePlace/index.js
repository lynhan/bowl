module.exports = {
    path: '/place',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('./components/BrowsePlace'))
        })
    },
}