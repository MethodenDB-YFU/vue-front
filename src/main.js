// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import Vuetify from 'vuetify'
import {
  Vuetify,
  VApp,
  VNavigationDrawer,
  VFooter,
  VList,
  VBtn,
  VIcon,
  VGrid,
  VToolbar,
  VCard,
  VTextField,
  VSelect,
  VDataTable,
  VProgressLinear,
  VDivider,
  VStepper,
  VAlert,
  VProgressCircular,
  transitions
} from 'vuetify'
import { store } from './store'
import '../node_modules/vuetify/src/stylus/app.styl'
import Editor from '@tinymce/tinymce-vue'
import UUID from 'vue-uuid'
import AlertCmp from './components/Shared/Alert.vue'
import EditMetadatenDialog from './components/methods/edit/EditMetadatenDialog.vue'
import EditContentDialog from './components/methods/edit/EditContentDialog.vue'
import EditAttachmentDialog from './components/methods/edit/EditAttachmentDialog.vue'

Vue.use(UUID)

Vue.component('app-alert', AlertCmp)
Vue.component('app-edit-metadaten-dialog', EditMetadatenDialog)
Vue.component('app-edit-content-dialog', EditContentDialog)
Vue.component('app-edit-attachment-dialog', EditAttachmentDialog)
Vue.component('editor', Editor)
// var Editor = require('@tinymce/tinymce-vue')

Vue.use(Vuetify, {
  components: {
    VApp,
    VNavigationDrawer,
    VFooter,
    VList,
    VBtn,
    VIcon,
    VGrid,
    VToolbar,
    VCard,
    VTextField,
    VSelect,
    VDataTable,
    VProgressLinear,
    VDivider,
    VStepper,
    VAlert,
    VProgressCircular,
    transitions
  },
  theme: {
    primary: '#632768',
    secondary: '#424242',
    accent: '#82B1FF',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107'
  }
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
