module.exports = {
    path: '/submit',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('./components/Submit'))
        })
    },
}