/*const admin = require('./admin')*/

module.exports = app => {
    app.post('/signup', app.api.user.save)
    app.post('/signin', app.api.auth.signin)
    app.post('/validateToken', app.api.auth.validateToken)
    app.route('/')
        .get(app.api.index.index)
    app.route('/users')
        .all(app.config.passport.authenticate())
        .get(app.api.user.get)

    app.route('/users/:id')
        .all(app.config.passport.authenticate())
        .put(app.api.user.save)
        .get(app.api.user.getById)
        .delete(app.api.user.remove)
    app.route('*')
        .get(app.api.user.fourerr)
        .post(app.api.user.fourerr)
        .put(app.api.user.fourerr)
        .delete(app.api.user.fourerr)

}