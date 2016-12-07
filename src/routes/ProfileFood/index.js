module.exports = {
    path: '/food/:id',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('./components/ProfileFood'))
        })
    },
}