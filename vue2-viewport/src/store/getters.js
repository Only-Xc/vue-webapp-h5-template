export default {
  navBar: state => Object.assign({}, state.app.navBar, state.app.currPageNavBar),
  tabBar: state => state.app.tabBar
}
