<template>
  <main>
    <div v-if="categoryTeams.length === 0" class="empty-state">
      Здесь нет доступных для голосования команд.
    </div>

    <div class="teams-grid">
      <TeamCard 
        v-for="team in categoryTeams"
        :key="team.id"
        :team="team"
      />
    </div>
  </main>
</template>

<script>
import TeamCard from './TeamCard.vue'

export default {
  name: 'CategoryContent',

  props: {
    categoryTeams: {
      type: Array,
      required: true,
      default: () => [],
    }
  },

  components: {
    TeamCard,
  },
};
</script>

<style scoped>
.teams-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  padding: 10px 0;
}

@media (max-width: 768px) {
  .teams-grid {
    grid-template-columns: 1fr;
  }
}
</style>
