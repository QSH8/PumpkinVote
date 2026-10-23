import { submitVotesAPI } from '@/api/votes.api.js'
import { getCategoriesAPI } from '@/api/votes.api.js'
import { getTeamsAPI } from '@/api/votes.api.js'

export default {
  namespaced: true,

  state: () => ({
    categories: [], 
    teams: [],
    
    // Структура: { [categoryId]: { [points]: teamId } }
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
    // Проверка заполненности конкретного таба
    isCategoryComplete: (state) => (categoryId) => {
      const catVotes = state.votes[categoryId]

      if (!catVotes) return false

      return catVotes[3] !== null && catVotes[2] !== null && catVotes[1] !== null
    },

    // Валидация всей формы для дизейбла кнопки отправки
    isVotingValid: (_, getters) => {
      const keys = [1, 2, 3, 4, 'absolute']
      return keys.every(key => getters.isCategoryComplete(key))
    },

    // Маппинг стейта под плоский массив для бэкенда
    payloadForBackend: (state) => {
      const flatVotes = []
      
      Object.entries(state.votes).forEach(([catId, distribution]) => {
        const category_id = catId === 'absolute' ? null : Number(catId)
        
        Object.entries(distribution).forEach(([points, teamId]) => {
          if (teamId !== null) {
            flatVotes.push({
              category_id,
              team_id: Number(teamId),
              points: Number(points)
            })
          }
        })
      })
      
      return { votes: flatVotes }
    }
  },

  mutations: {
    SET_INITIAL_DATA(state, { categories, teams }) {
      state.categories = categories
      state.teams = teams
    },

    SET_VOTE(state, { categoryId, points, teamId }) {
      if (state.votes[categoryId]) {
        state.votes[categoryId][points] = teamId
      }
    },

    CLEAR_VOTE(state, { categoryId, points }) {
      if (state.votes[categoryId]) {
        state.votes[categoryId][points] = null
      }
    },

    SET_SUBMITTING(state, status) {
      state.isSubmitting = status
    },

    SET_ERROR(state, error) {
      state.votingError = error
    }
  },

  actions: {
    // 1. Инициализация данных при старте голосования
    async initVotingData({ commit }) {
      try {
        const [categoriesRes, teamsRes] = await Promise.all([
          getCategoriesAPI(),
          getTeamsAPI()
        ])
        
        commit('SET_INITIAL_DATA', {
          categories: categoriesRes.data,
          teams: teamsRes.data
        })
      } catch (err) {
        commit('SET_ERROR', 'Не удалось загрузить списки участников.')
      }
    },
    
    setVote({ commit }, payload) {
      commit('SET_VOTE', payload)
    },

    clearVote({ commit }, payload) {
      commit('CLEAR_VOTE', payload);
    },

    // Чистый экшн без прямой зависимости от axios
    async submitAllVotes({ commit, getters }) {
      if (!getters.isVotingValid) {
        commit('SET_ERROR', 'Заполните все категории перед отправкой.')
        return false
      }

      commit('SET_SUBMITTING', true)
      commit('SET_ERROR', null)

      try {
        const payload = getters.payloadForBackend
        
        // Вызываем функцию из твоего слоя API
        await submitVotesAPI(payload)
        
        commit('SET_SUBMITTING', false)
        return true
      } catch (err) {
        commit('SET_SUBMITTING', false)
        // Адаптируй под то, как твой класс API выплевывает ошибки наружу
        const errMsg = err.error || 'Ошибка при отправке голосов'
        commit('SET_ERROR', errMsg)
        return false
      }
    }
  }
}
