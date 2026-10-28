<template>
  <div class="vote-buttons-group">
    <button 
      v-for="score in scoreList" 
      :key="score.id"
      type="button"
      class="score-badge-btn"
      :class="{ 'is-active': teamId === this.votedTeamByScore(score.value), 'is-disabled': isScoreButtonDisabled(score.value) }"
      @click="toggleVote(score.value)"
    >
      {{ score.value }}
    </button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'VoteButtonGroup',
  
  props: {
    teamId: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      scoreList: [
        { id: 1, value: 1 },
        { id: 2, value: 2 },
        { id: 3, value: 3 },
      ],

      currentTeamVote: null
    };
  },

  computed: {
    ...mapGetters('voting', ['votedTeamByScore']),
  },

  methods: {
    ...mapActions('voting', ['setVote', 'clearVote']),

    isScoreButtonDisabled(score) {
      const votedTeamByScore = this.votedTeamByScore(score) // teamId || anotherTeamId || null

      return (
        (votedTeamByScore && votedTeamByScore !== this.teamId) ||
        (!votedTeamByScore && this.currentTeamVote)
      )
    },

    isActive(score) {
      return this.currentTeamVote === score
    },
    
    toggleVote(score) {
      if (this.currentTeamVote === score) {
        this.currentTeamVote = null
        this.clearVote({ score })
      } else {
        this.currentTeamVote = score
        this.setVote({ score, teamId: this.teamId })
      }
    },
  }
};
</script>

<style scoped>
.vote-buttons-group {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.score-badge-btn {
  width: 36px;
  height: 36px;
  border: 2px solid #222;
  border-radius: 50%;
  background: #fff;
  color: #222;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.score-badge-btn.is-active {
  border-color: #222;
  background: #222;
  color: #fff;
}

.score-badge-btn.is-disabled {
  border-color: #bbb;
  color: #bbb;
  pointer-events: none;
}
</style>
