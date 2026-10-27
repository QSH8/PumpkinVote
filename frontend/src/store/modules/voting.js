import { submitVotesAPI } from '@/api/votes.api.js'
import { getCategoriesAPI } from '@/api/categories.api'
import { getTeamsByCategoryAPI } from '@/api/teams.api.js'
import { toast } from 'vue3-toastify';
import { payloadForBackend } from '@/services';

export default {
  namespaced: true,

  state: () => ({
    categories: [], 
    currentCategory: 1,
    teams: [],
    
    votes: {
      1: { 3: null, 2: null, 1: null },
      2: { 3: null, 2: null, 1: null },
      3: { 3: null, 2: null, 1: null },
      4: { 3: null, 2: null, 1: null },
      'absolute': { 3: null, 2: null, 1: null }
    },
    
    isSubmitting: false,
    votingError: null
  }),

  getters: {
    availableTeams: (state, _, rootState) => {
      return state.teams.filter(team => team.id !== Number(rootState?.currentUser?.team_id))
    },

    currentCategoryTeams: (state, getters) => {
      return getters.availableTeams.filter(team => team.category_id === state.currentCategory)
    },

    wholeCategories: (state) => {
      return [...state.categories, { id: 'absolute', name: 'Общий зачёт'}]
    },

    currentCategoryVotes: (state) => {
      return state.votes[state.currentCategory]
    },

    wasTeamVoted: (_, getters) => (teamId) => {
      return Object.values(getters.currentCategoryVotes).includes(teamId)
    },

    votedTeamByScore: (_, getters) => (score) => { // { 3: null, 2: null, 1: anotherTeamId }
      return getters.currentCategoryVotes[score]
    },

    isCategoryComplete: (state) => (categoryId) => {
      const catVotes = state.votes[categoryId]

      if (!catVotes) return false

      return catVotes[3] !== null && catVotes[2] !== null && catVotes[1] !== null
    },

    isVotingValid: (_, getters) => {
      const keys = [1, 2, 3, 4, 'absolute']
      return keys.every(key => getters.isCategoryComplete(key))
    },
  },

  mutations: {
    SET_INITIAL_DATA(state, { categories, teams }) {
      state.categories = categories
      state.teams = teams
    },

    SET_VOTE(state, { categoryId, score, teamId }) {
      if (state.votes[categoryId]) {
        state.votes[categoryId][score] = teamId
      }
    },

    CLEAR_VOTE(state, { score, categoryId }) {
      if (state.votes[categoryId]) {
        state.votes[categoryId][score] = null
      }
    },

    SET_SUBMITTING(state, status) {
      state.isSubmitting = status
    },

    SET_ERROR(state, error) {
      state.votingError = error
    },

    SET_CURRENT_CATEGORY(state, categoryId) {
      state.currentCategory = categoryId
    },
  },

  actions: {
    setCurrentCategory({ state, commit }, categoryId) {
      if (state.currentCategory !== categoryId) {
        commit('SET_CURRENT_CATEGORY', categoryId)
      }
    },

    async initVotingData({ commit }) {
      console.log('initVotingData');
      
      try {
        const [categoriesRes, teamsRes] = await Promise.all([
          getCategoriesAPI(),
          getTeamsByCategoryAPI()
        ])
        
        commit('SET_INITIAL_DATA', {
          categories: categoriesRes.data?.data ?? [],
          teams: teamsRes.data?.data ?? []
        })
      } catch (err) {
        commit('SET_ERROR', 'Не удалось загрузить списки участников.')
      }
    },
    
    setVote({ state, commit }, { score, teamId }) {
      console.log('setVote');

      commit('SET_VOTE', { score, teamId, categoryId: state.currentCategory })
    },

    clearVote({ state, commit }, { score }) {
      console.log('clearVote');

      commit('CLEAR_VOTE', { score, categoryId: state.currentCategory });
    },

    async submitAllVotes({ state, commit, getters }) {
      console.log('submitAllVotes');

      if (!getters.isVotingValid) {
        toast(`Заполните все категории перед отправкой`, { autoClose: 1500, type: 'warning', position: 'top-center' })

        return false
      }

      commit('SET_SUBMITTING', true)

      try {
        await submitVotesAPI(payloadForBackend(state.votes))
        commit('SET_SUBMITTING', false)

        return true
      } catch (err) {
        commit('SET_SUBMITTING', false)
        toast(`Ошибка при отправке голосов`, { autoClose: 1500, type: 'error', position: 'top-center' })

        return false
      }
    }
  }
}
