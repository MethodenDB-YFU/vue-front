import {uuid} from 'vue-uuid'

export default {
  state: {
    id: '',
    email: '',
    displayName: '',
    role: ''
  },
  mutations: {
    setUser (state, payload) {
      //      state.fuser = firebase.auth().currentUser
      if (payload) {
        state.id = payload.id
        state.displayName = payload.displayName
      } else {
        state.id = ''
        state.displayName = ''
      }
    }
  },
  /******************************************************************************/
  actions: {
    signUserUp ({commit}, payload) {
      commit('setLoading', true)
      const newUserDat = {
        id: uuid.v1(),
        email: payload.email,
        displayName: ''
      }
      commit('setUser', newUserDat)
      commit('setLoading', false)
    },
    /******************************************************************************/
    signUserIn ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      const newUserDat = {
        id: uuid.v1(),
        email: payload.email,
        displayName: ''
      }
      commit('setUser', newUserDat)
      commit('setLoading', false)
    },
    /******************************************************************************/
    autoSignIn ({commit, getters}, payload) {
      commit('setLoading', true)
      const newUserDat = {
        id: uuid.v1(),
        email: payload.email,
        displayName: ''
      }
      commit('setUser', newUserDat)
      commit('setLoading', false)
    },
    /******************************************************************************/
    logout ({commit}) {
      commit('setUser', null)
    }
  },
  /******************************************************************************/
  getters: {
    user (state, getters) {
      const actUser = {
        id: state.id,
        email: state.email,
        displayName: state.displayName,
        role: state.role
      }
      return actUser
    }
  }
}
