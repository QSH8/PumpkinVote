<template>
  <!-- Меню отображается только если проп isOpen === true -->
  <transition name="fade">
    <nav v-if="isOpen" class="header-menu">
      <ul class="menu-list">
        <li>
          <router-link to="/vote" @click="$emit('close')">Голосование</router-link>
        </li>
        <li>
          <router-link to="/login" @click="toExit">Выйти</router-link>
        </li>
      </ul>
    </nav>
  </transition>
</template>

<script>
export default {
  name: 'HeaderMenu',
  props: {
    isOpen: {
      type: Boolean,
      required: true
    }
  },
  emits: ['close'],
  
  methods: {
    toExit(){
      localStorage.removeItem('token');
      window.dispatchEvent(new Event('local-storage-updated'))

      this.$emit('close')
    }
  }
};
</script>

<style scoped>
.header-menu {
  position: absolute;
  top: 100%;
  /* Сразу под хедером */
  left: 0;
  width: fit-content;
  background-color: #ffffff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.menu-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.menu-list li {
  border-bottom: 1px solid #eee;
}

.menu-list a {
  display: block;
  padding: 8px 15px;
  text-decoration: none;
  color: #333;
  font-size: 14px;
}

.menu-list a:active {
  background-color: #f0f0f0;
}

.header-left,
.header-right {
  flex: 0 0 40px;
  display: flex;
  align-items: center;
}
</style>
