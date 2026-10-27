<template>
  <div class="voting-layout">
    <CategoryTabs />

    <template v-for="(categoryTeams, category) in teams" :key="categoryTeams.id">
      <CategoryContent v-show="category == $store.state.voting.currentCategory" :category-teams="categoryTeams"/>
    </template>

    <VotingFooter />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import CategoryTabs from '@/components/CategoryTabs.vue'
import CategoryContent from '@/components/CategoryContent.vue'
import VotingFooter from '@/components/VotingFooter.vue'
export default {
  name: 'VotingLayout',

  components: {
    CategoryTabs,
    CategoryContent,
    VotingFooter,
  },
  
  data() {
    return {
      currentUser: null,
    };
  },

  computed: {
    ...mapState('voting', ['teams']),
  },

  created() {
    this.$store.dispatch('voting/initVotingData')
  }
};
</script>

<style scoped>
.voting-layout {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}
</style>
