<template>
  <header class="app-header">
    <div class="header-container">
      <div class="header-center">
        <h2>Голосование за лучший костюм</h2>
      </div>
      <div v-if="currentUser.id" class="header__username">
        <span class="header__username-text" :class="{ 'admin': currentUserIsAdmin }">{{ currentUser.username }}</span>
      </div>
    </div>
  </header>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'TheHeader',
  computed: {
    ...mapState(['currentUser']),
    ...mapGetters(['currentUserIsAdmin']),
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
.header__username {
  position: absolute;
  right: 30px;
}

.header__username-text {
  font-size: 20px;
  font-weight: 700;
}

.header__username-text.admin{
  color: gold;
  text-shadow: #ffcc00 1px 0 10px;
}

.header-center {
  padding: 10px 0;
}

.logo {
  font-weight: bold;
  text-decoration: none;
  color: #333;
  font-size: 1rem;
}

@media (max-width: 768px) {
  .header__username {
    position: static;
    right: 0;
  }

  .header-container {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
    padding: 5px 0;
  }

  .header-center {
    padding: 5px 0;
  } 
}
</style>