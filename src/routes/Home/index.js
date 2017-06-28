export default {
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Home = require('./layouts/HomeLayout').default
      cb(null, Home)
    })
  }
}
