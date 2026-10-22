<template>
  <header class="app-header">
    <div class="header-container">
      <div v-click-outside="closeMenu" class="header-left">
        <button class="icon-btn burger-btn" @click="toggleMenu" aria-label="Открыть меню">
          <div class="burger-icon" :class="{ 'is-active': isMenuOpen }">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>
        <HeaderMenu :is-open="isMenuOpen" @close="closeMenu" />
      </div>
      <div class="header-center">
        <router-link to="/" class="logo">Pumpkin</router-link>
      </div>
    </div>
    <TheBreadcrumbs />
  </header>
</template>

<script>
import HeaderMenu from './HeaderMenu.vue';
import TheBreadcrumbs from './TheBreadcrumbs.vue';

export default {
  name: 'TheHeader',
  components: {
    HeaderMenu,
    TheBreadcrumbs,
  },
  data() {
    return {
      isMenuOpen: false,
      isAuth: false,
    }
  },

  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },

    closeMenu() {
      this.isMenuOpen = false
    },

    checkToken() {
      this.isAuth = !!localStorage.getItem('token')
    }
  },

  mounted() {
    window.addEventListener('local-storage-updated', this.checkToken)
  },

  unmounted() {
    window.removeEventListener('local-storage-updated', this.checkToken)
  }
};
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
.header-left {
  position: absolute;
}

.header-right {
  justify-content: flex-end;
}

.header-center {
  flex: 1;
  text-align: center;
}

.logo {
  font-weight: bold;
  text-decoration: none;
  color: #333;
  font-size: 1rem;
}

.icon-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #333;
}

.burger-icon {
  width: 20px;
  height: 12px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.burger-icon span {
  display: block;
  height: 2px;
  width: 100%;
  background-color: #333;
  border-radius: 3px;
  transition: all 0.3s ease;
}

.burger-icon.is-active span:nth-child(1) {
  transform: translateY(5px) rotate(45deg);
}

.burger-icon.is-active span:nth-child(2) {
  opacity: 0;
}

.burger-icon.is-active span:nth-child(3) {
  transform: translateY(-5px) rotate(-45deg);
}
</style>