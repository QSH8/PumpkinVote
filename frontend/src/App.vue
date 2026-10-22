<template>
  <div id="app" class="app-layout">
    <TheHeader />

    <main class="app-content">
      <router-view />
    </main>

    <TheFooter />
  </div>
</template>

<script>
import TheHeader from './components/TheHeader.vue';
import TheSidebar from './components/TheSidebar.vue';
import TheFooter from './components/TheFooter.vue';

// Глобальные стили

export default {
  name: 'App',
  components: {
    TheHeader,
    TheSidebar,
    TheFooter,
  }
};
</script>

<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
html, body {
  height: 100%;
  width: 100%;
  background-color: #f8f9fa;
   overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
}
#app {
  height: 100%;
}
.app-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  min-height: 100dvh; 
}

.logo {
  font-size: 1.25rem;
  font-weight: 700;
}

.app-main {
  flex: 1;
  width: 100%;
  margin: 0 auto;
  padding: 20px;
  padding-bottom: calc(40px + env(safe-area-inset-bottom, 0px));
}

@media (max-width: 768px) {
  .header-content {
    height: 50px;
    padding: 0 15px;
  }
  
  .app-main {
    padding: 15px;
    padding-bottom: calc(40px + env(safe-area-inset-bottom, 0px));
  }
}
</style>
