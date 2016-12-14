module.exports = {
    path: 'place/:id/:name',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('./components/ProfilePlace'))
        })
    },
}