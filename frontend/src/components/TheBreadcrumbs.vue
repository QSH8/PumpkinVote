<template>
  <transition name="fade">
    <div v-if="isVisible" class="breadcrumbs">
      <span class="breadcrumbs__text">{{ breadcrumbs }}</span>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'TheBreadcrumbs',

  data() {
    return {
      isVisible: true,
    }
  },

  watch: {
    breadcrumbs() {
      this.switchBreadcrumbVisible
    },
  },

  computed: {
    breadcrumbs() {
      return this.$route?.meta?.translation ?? ''
    }
  },

  methods: {
    switchBreadcrumbVisible() {
      this.isVisible = false

      this.$nextTick(() => {
        this.isVisible = true
      })
    }
  }
}
</script>

<style lang="css" scoped>
.breadcrumbs {
  display: flex;
  flex-direction: row;
  justify-content: center;
  min-height: 1.5rem;
  border-top: 1px solid rgba(0, 0, 0, 0.13);
}

.breadcrumbs__text {
  font-size: 0.8rem;
  font-weight: 500;
}
</style>