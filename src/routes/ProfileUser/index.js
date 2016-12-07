module.exports = {
    path: '/me(/:id)',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('./components/ProfileUser'))
        })
    },
}