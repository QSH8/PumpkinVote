<template>
  <div class="voting-layout">
    <CategoryTabs />

    <transition name="fade" mode="out-in">
      <CategoryContent :key="$store.state.voting.currentCategory" :category-teams="categoryTeams"/>
    </transition>

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

    categoryTeams() {
      return this.teams?.[this.$store.state.voting?.currentCategory] ?? []
    }
  },

  created() {
    this.$store.dispatch('voting/initVotingData')
  }
};
</script>

<style scoped>
.voting-layout {
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}


@media (max-width: 768px) {
  .voting-layout {
    padding: 5px;
  }
}
</style>
