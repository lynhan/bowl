module.exports = {
    path: '/findplace',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('./components/FindPlace'))
        })
    },
}