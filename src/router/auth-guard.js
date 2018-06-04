import {store} from '../store'
// import auth from '../store/fireaut'

export default (to, from, next) => {
  if (to.path === '/') {
    console.log('nach Hause')
//    store.getters.isRootPath = true
  } else {
    console.log('nach ' + to.path)
//
  }
  let user = store.getters.user
  if (user.id !== '') {
    next()
  } else {
    next('/login')
  }
}
