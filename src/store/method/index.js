import { uuid } from 'vue-uuid'
export default {
  state: {
    seminarTypes: null,
    seminarTypeGoals: null,
    seminarGoals: null,
    methodTypes: null,
    methodLevels: null,
    method: {
      key: '',
      name: '',
      content: '',
      seminar: '',
      seminartype: null,
      typ: '',
      method_types: null,
      level: '',
      method_levels: null,
      seminar_goals: '',
      attachments: ''
    }
  },
  /******************************************************************************/
  mutations: {
    setMethod (state, payload) {
      state.method = payload
    },
    setSeminarTypes (state, payload) {
      state.seminarTypes = payload
    },
    setSeminarGoals (state, payload) {
      state.seminarGoals = payload
    },
    setMethodTypes (state, payload) {
      state.methodTypes = payload
    },
    setMethodLevels (state, payload) {
      state.methodLevels = payload
    },
    setMethodMeta (state, payload) {
      state.method.key = payload.key
      state.method.name = payload.name
      state.method.seminar = payload.seminar
      state.method.typ = payload.typ
      state.method.level = payload.level
      state.method.seminar_goals = payload.seminar_goals
    },
    setMethodContent (state, payload) {
      state.method.content = payload.content
    },
    setMethodAttachment (state, payload) {
      state.method.attachments = payload.attachments
    },
    setdMethod (state, payload) {
      state.method = payload
    }
  },
  /******************************************************************************/
  actions: {
    /******************************************************************************/
    readMethod ({commit, getters, dispatch}, payload) {
      dispatch('setLoading', true)
      fetch('http://localhost:1234/api/methods/' + payload.id, {method: 'GET', headers: {'Content-Type': 'application/json', 'X-User-ID': 'aa40d8c0-e705-11e7-80c1-9a214cf093ae'}})
      .then(results => {
        return results.json()
      }).then(data => {
        let method = {
          key: data.id,
          name: data.title,
          content: data.content,
          seminar: data.seminar_type.name,
          seminartype: data.seminar_type,
          typ: data.method_types[0].name,
          method_types: data.method_types,
          level: data.method_levels[0].name,
          method_levels: data.method_levels,
          attachments: data.attachments
        }
        console.log(method)
        // display loaded methods and remove loading-animation
//        this.method = method
        commit('setdMethod', method)
        dispatch('setLoading', false)
      })
    },
    /******************************************************************************/
    readSeminarTypes ({commit, getters}, payload) {
      fetch('http://localhost:1234/api/seminars/types', {method: 'GET', headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}})
      .then(results => {
        return results.json()
      }).then(data => {
//        console.log(data)
        let seminarTypes = data.map((type) => {
          let options = {
            value: type.id,
            text: type.name
          }
          return options
        })
        console.log('seminarTypes')
        console.log(seminarTypes)
        // mapping the seminar goals to the seminar-type id so when the seminar type is selected
        // only those goals can be selected which are availabel for the seminar type.
        var seminarGoals = []
//        let seminarTypeGoals = []
        let Goals = data.map((type) => {
          let Goal = type.seminar_goals.map((goal) => {
            return ({
              value: goal.id,
              text: goal.name
            })
          })
          return Goal
        })
        Goals.forEach(element => {
          element.forEach(goal => {
            seminarGoals.push(goal)
          })
        })
        console.log('seminarGoals')
        console.log(seminarGoals)
        commit('setSeminarTypes', seminarTypes)
        commit('setSeminarGoals', seminarGoals)
      })
    },
    readMethodTypes ({commit, getters}, payload) {
        // fetching the method types
      fetch('http://localhost:1234/api/methods/types')
        .then(results => {
          return results.json()
        }).then(data => {
          let methodTypes = data.map((type) => {
            return ({
              value: type.id,
              text: type.name
            })
          })
          commit('setMethodTypes', methodTypes)
        })
    },
    readMethodLevels ({commit, getters}, payload) {
      fetch('http://localhost:1234/api/methods/levels')
        .then(results => {
          return results.json()
        }).then(data => {
          let methodLevels = data.map((type) => {
            return ({
              value: type.id,
              text: type.name
            })
          })
          commit('setMethodLevels', methodLevels)
        })
    },
    updateMethodeMeta ({commit, getters}, payload) {
      commit('setMethodMeta', payload)
    },
    updateMethodeContent ({commit, getters}, payload) {
      commit('setMethodContent', payload)
    },
    updateMethodeAttachment ({commit, getters}, payload) {
      commit('setMethodAttachment', payload)
    },
    createMethode ({commit, getters}, payload) {
      let newMethod = getters('Method')
      if (payload) {
        newMethod = payload
      }
      return fetch('http://localhost:1234/api/methods', {
        body: JSON.stringify(newMethod), // must match 'Content-Type' header
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, same-origin, *omit
        headers: {
          'user-agent': 'Mozilla/4.0 MDN Example',
          'content-type': 'application/json'
        },
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, cors, *same-origin
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer' // *client, no-referrer
      })
      .then(response => response.json()) // parses response to JSON
    },
    saveMethode ({commit, getters}, payload) {
      let newMethod = getters('Method')
      if (payload) {
        newMethod = payload
      }
      return fetch('http://localhost:1234/api/methods', {
        body: JSON.stringify(newMethod), // must match 'Content-Type' header
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, same-origin, *omit
        headers: {
          'user-agent': 'Mozilla/4.0 MDN Example',
          'content-type': 'application/json'
        },
        method: 'PUT', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, cors, *same-origin
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer' // *client, no-referrer
      })
      .then(response => response.json()) // parses response to JSON
    },
    initMethode ({commit, getters}, payload) {
      let method = {
        key: uuid.v1(),
        name: ' ',
        content: ' please Enter Content ',
        seminar: ' ',
        seminartype: [{ id: ' ', name: '' }],
        typ: '',
        method_types: [{ id: ' ', name: '' }],
        level: ' ',
        method_levels: [{ id: ' ', name: '' }],
        attachments: [{ id: uuid.v1(), content: '  please Enter Attatchment ' }]
      }
      console.log(method)
      // display loaded methods and remove loading-animation
//        this.method = method
      commit('setdMethod', method)
    }
  },
/******************************************************************************/
  getters: {
    seminarTypes (state, getters, dispatch) {
      if (state.seminarTypes) {
        return state.seminarTypes
      } else {
        console.log('seminarTypes = NULL')
        return state.seminarTypes
      }
    },
    seminarGoals (state, getters) {
      if (state.seminarGoals) {
        return state.seminarGoals
      } else {
        console.log('seminarGoals = NULL')
        return state.seminarGoals
      }
    },
    methodTypes (state, getters) {
      if (state.methodTypes) {
        return state.methodTypes
      } else {
        console.log('methodTypes = NULL')
        return state.methodTypes
      }
    },
    methodLevels (state, getters) {
      if (state.methodLevels) {
        return state.methodLevels
      } else {
        console.log('methodLevels = NULL')
        return state.methodLevels
      }
    },
    Method (state, getters) {
      if (state.method) {
        return state.method
      } else {
        console.log('method = NULL')
        return state.method
      }
    }
  }
}
