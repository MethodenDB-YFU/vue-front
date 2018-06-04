<template>
  <v-app>
    <v-navigation-drawer
      temporary
      v-model="sideNav"
      enable-resize-watcher
      fixed
      app
    >
      <v-list>
        <v-list-tile
          value="true"
          v-for="(item, i) in menuItems"
          :key="i"
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app dark class="primary" >
      <v-toolbar-side-icon @click.stop="sideNav = !sideNav"></v-toolbar-side-icon>
      <router-link to="/" tag="span" style="cursor: pointer"><v-toolbar-title v-text="title"></v-toolbar-title></router-link>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn
          flat
          v-for="item in menuItems"
          :key="item.title"
          :to="item.link">
          <v-icon left dark v-if="!item.img">{{ item.icon }}</v-icon>
           <img :src="item.src" width="20em" v-else>
          {{ item.title }}
        </v-btn>
        <v-btn
          v-if="userIsAuthenticated"
          flat
          @click="onLogout">
          <v-icon left dark>exit_to_app</v-icon>
          Logout
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <router-view/>
    </v-content>
    <v-navigation-drawer
      temporary
      :right="right"
      v-model="rightDrawer"
      fixed
      app
    >
      <v-list>
        <v-list-tile @click="right = !right">
          <v-list-tile-action>
            <v-icon>compare_arrows</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Switch drawer (click me)</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-footer :fixed="fixed" app>
      <span>&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      clipped: false,
      sideNav: false,
      fixed: false,
      right: true,
      rightDrawer: false,
      title: 'Methoden DB'
    }
  },
  computed: {
    menuItems () {
      let menuItems = [
        {icon: 'face', img: false, src: '', title: 'Registrieren', link: '/signup'},
        {icon: 'lock_open', img: false, src: '', title: 'Anmelden', link: '/signin'}
      ]
      if (this.userIsAuthenticated) {
        menuItems = []
        menuItems = [
          {icon: 'wb_incandescent', img: false, src: '../assets/idea.svg', title: 'Methoden', link: '/methods'},
          {icon: 'school', img: false, src: '../assets/Seminar.svg', title: 'Seminarziele', link: '/standby'}
        ]
/*
        menuItems.push({icon: 'timer', title: 'Artztsuch', link: '/standby/map'})
        menuItems.push({icon: 'person', title: 'Profile', link: '/profile'})
        */
      }
      return menuItems
    },
    userIsAuthenticated () {
      console.log('userIsAuthenticated ' + this.$store.getters.user.id)
      return this.$store.getters.user !== null && this.$store.getters.user !== undefined && this.$store.getters.user.id !== ''
    }
  },
  methods: {
    onLogout () {
      this.$store.dispatch('logout')
    }
  },
  name: 'App'
}
</script>
