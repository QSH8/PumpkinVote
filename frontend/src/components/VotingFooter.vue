<template>
  <footer class="voting-footer">
    <button
      class="submit-btn"
      type="button"
      :disabled="!isVotingValid || isSubmitting"
      @click="handleSubmitVotes"
    >
      {{ isSubmitting ? 'Отправка...' : 'Завершить голосование' }}
    </button>
  </footer>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
  name: 'VotingFooter',

  computed: {
    ...mapState('voting', ['isSubmitting']),
    ...mapGetters('voting', ['isVotingValid']),
  },

  methods: {
    ...mapActions('voting', ['submitAllVotes']),

    async handleSubmitVotes() {
      const success = await this.submitAllVotes();
      
      if (success) {
        this.$router.push('/results');
      }
    },
  }
};
</script>

<style scoped>
.voting-footer {
  position: sticky;
  bottom: 0;
  padding-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.submit-btn {
  width: 100%;
  padding: 15px 30px;
  font-size: 1.1rem;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
}

.submit-btn:disabled {
  background-color: #95a5a6;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .submit-btn {
    padding: 10px 20px;
    font-size: 1.1rem;
    background-color: #42b983;
    color: white;
    border: none;
    border-radius: 10px;
    cursor: pointer;
  }
}
</style>
