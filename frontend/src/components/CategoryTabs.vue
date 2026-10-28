<template>
  <nav class="tabs-navigation">
    <button
      v-for="cat in categories"
      :key="cat.id"
      type="button"
      class="tab"
      :class="{ 'is-active': cat.id === currentCategory, 'is-complete': isCategoryComplete(cat.id) }"
      @click="switchCategory(cat.id)"
    >
      {{ cat.name }}
    </button>

    <button
      key="absolute"
      type="button"
      class="tab"
      :class="{ 'is-active': 'absolute' === currentCategory, 'is-complete': isCategoryComplete('absolute') }"
      @click="switchCategory('absolute')"
    >
      Общий зачёт
    </button>
  </nav>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
  name: 'CategoryTabs',

  computed: {
    ...mapState('voting', ['categories', 'currentCategory']),
    ...mapGetters('voting', ['isCategoryComplete']),
  },

  methods: {
    ...mapActions('voting', ['setCurrentCategory']),

    switchCategory(catId) {
      this.setCurrentCategory(catId)
    }
  }
};
</script>

<style scoped>
.tabs-navigation {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  border-bottom: 2px solid #ccc;
  padding-bottom: 10px;
  overflow-y: scroll;
  scrollbar-width: none;
  white-space: nowrap;
}

.tab {
  padding: 10px 20px;
  text-decoration: none;
  color: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #7fbee9;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.3s ease , border 0.3s ease;
}

.tab.is-complete {
  background-color: #42b983;
  color: white;
  border-color: #42b983;
}

.tab.is-active {
  background-color: #367edd;
  color: white;
  border-color: #367edd;
}

@media (max-width: 768px) {
  .tab {
    padding: 5px 10px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 14px;
  }
}
</style>
