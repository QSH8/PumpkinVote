<template>
  <header class="app-header">
    <div class="header-container">
      <div class="header-center">
        <h2>Голосование за лучший костюм</h2>
      </div>
    </div>
    <div v-if="currentUser.id" class="user-info">
      <span><strong>{{ currentUser.username }}</strong></span>
    </div>
  </header>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'TheHeader',
  computed: {
    ...mapState(['currentUser']),
  },
}

</script>

<style scoped>
/* 3. ШАПКА (С адаптацией под iPhone сверху) */
.app-header {
  background-color: #ffffff;
  color: #333333;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 0;
  z-index: 100;
  /* Решение для iPhone: добавляем безопасный отступ сверху под "челку" */
  padding-top: env(safe-area-inset-top, 0px);
}

.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 0 15px;
}
.header-center {
  flex: 1;
  text-align: center;
}
.header-center h2 {
  padding: 10px 0;
}

.logo {
  font-weight: bold;
  text-decoration: none;
  color: #333;
  font-size: 1rem;
}
</style>