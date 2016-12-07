module.exports = {
    path: '/browsefood',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('./components/BrowseFood'))
        })
    },
}