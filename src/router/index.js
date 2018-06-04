import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/user/Login'
import Methods from '@/components/methods/MethodenList'
import MethodDetails from '@/components/methods/MethodDetails'
import MethodNew from '@/components/methods/MethodNew'
import MethodEdit from '@/components/methods/MethodEdit'
import AuthGuard from './auth-guard'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      beforeEnter: AuthGuard
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/methods',
      name: 'Methods',
      component: Methods,
      beforeEnter: AuthGuard
    },
    {
      path: '/method/new',
      name: 'MethodNew',
      component: MethodNew,
      beforeEnter: AuthGuard
    },
    {
      path: '/method/edit/:id',
      name: 'MethodEdit',
      component: MethodEdit,
      beforeEnter: AuthGuard
    },
    {
      path: '/method/show/:id',
      name: 'MethodDetails',
      component: MethodDetails,
      beforeEnter: AuthGuard
    }
  ],
  mode: 'history'
})
