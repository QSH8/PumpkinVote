<template>
  <div class="vote-button-group">
    <button 
      v-for="score in scoreList" 
      :key="score.id"
      type="button"
      class="score-badge-btn"
      :class="{ 'is-active': teamId === this.votedTeamByScore(score.value), 'is-disabled': isScoreButtonDisabled(score.value) }"
      @click="toggleVote($event, score.value)"
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
        { id: 3, value: 3 },
        { id: 2, value: 2 },
        { id: 1, value: 1 },
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
    
    toggleVote(event, score) {
      if (this.isScoreButtonDisabled(score)) {
        event.preventDefault()
        return
      }

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
.vote-button-group {
  display: inline-flex;
  background-color: #f1f3f5;
  justify-content: center;
  padding: 4px;
  border-radius: 30px;
  gap: 20px;
}

.score-badge-btn {
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.05);
  color: #5c4d42; 
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.25s ease, color 0.25s ease, transform 0.15s ease, opacity 0.25s ease;

  clip-path: polygon(
    50% 0%,   /* Верхушка хвостика */
    53% 12%,  /* Основание хвостика справа */
    70% 15%,  /* Верхний правый изгиб плеча */
    90% 30%,  /* Правый бок верх */
    100% 55%, /* Самая широкая точка справа */
    90% 85%,  /* Нижний правый изгиб */
    70% 98%,  /* Низ справа */
    50% 93%,  /* Впадинка снизу по центру */
    30% 98%,  /* Низ слева */
    10% 85%,  /* Нижний левый изгиб */
    0% 55%,   /* Самая широкая точка слева */
    10% 30%,  /* Левый бок верх */
    30% 15%,  /* Верхний левый изгиб плеча */
    47% 12%   /* Основание хвостика слева */
  );
}

.score-badge-btn:active:not(:disabled) {
  transform: scale(0.95);
  background-color: rgba(217, 107, 39, 0.1);
  color: #d96b27;
}

.score-badge-btn.is-active {
  background-color: #d96b27;
  color: #ffffff;  
  filter: drop-shadow(0px 4px 12px rgba(217, 107, 39, 0.35)); 
}

.score-badge-btn.is-disabled {
  opacity: 0.35;
  cursor: not-allowed;
  background-color: transparent;
  color: #adb5bd;
  pointer-events: none;
  background-color: rgba(92, 77, 66, 0.05);
}
</style>
