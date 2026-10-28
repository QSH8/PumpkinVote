import { createStore } from 'vuex'
import voting from './modules/voting.js'

export default createStore({
  state() {
    return {
      currentUser: {
        id: null,
        username: null,
        user_role: 'user',
        team_id: null,
      },
    };
  },
  
  getters: {},
  
  mutations: {
    SET_CURRENT_USER(state, user) {
      state.currentUser = user
    }
  },
  
  actions: {
    setCurrentUser({ commit }, user) {
      commit('SET_CURRENT_USER', user)
    }
  },

  modules: {
    voting,
  }
})
