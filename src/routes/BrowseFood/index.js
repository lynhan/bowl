module.exports = {
    path: '/food',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('./components/BrowseFood'))
        })
    },
}