<template>
  <div class="login-container">
    <div class="login-form">
      <h2>Вход</h2>

      <div class="form-group">
        <label for="login" class="form-label">Логин</label>
        <input
          id="login"
          v-model.trim="login"
          type="text"
          class="form-input"
          required
        />
      </div>
      <div class="form-group">
        <label for="client-name" class="form-label">Пароль</label>
        <input
          id="password"
          v-model.trim="password"
          type="password"
          class="form-input"
          required
        />
      </div>
      
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

      <button type="button" @click="handleLogin">Войти</button>
    </div>
  </div>
</template>

<script>
import { loginAPI } from '@/api/index.js'

export default {
  name: 'Login',
  data() {
    return {
      login: '',
      password: '',
      errorMessage: '',
    }
  },
  methods: {
    async handleLogin() {
      try {
        this.errorMessage = '';
        const { data } = await loginAPI({ login: login.value, password: password.value })
       
        if (data.error) {
          this.errorMessage = data?.error || 'Ошибка авторизации';
          return
        } else if (data.token) {
          localStorage.setItem('token', data.token);
          window.dispatchEvent(new Event('local-storage-updated'))
        }
        
        this.$router.push('/');
      } catch (e) {}
    }
  }
}
</script>

<style scoped lang="css">
h2 {
  text-align: center;
  color: white;
}
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url('../../assets/skrep.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
.login-form {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  width: 300px;
}
.form-group {
  margin-top: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
}

.form-label {
  font-size: 0.9rem;
  font-weight: 600;
  color: white;
  padding-left: 4px;
}


.form-input {
  width: 100%;
  background-color: #f2f2f7; 
  border: 1px solid transparent;
  border-radius: 10px; 
  padding: 0.4rem;
  font-size: 15px;
  color: #1c1c1e;
  outline: none;
  box-sizing: border-box;
  font-family: inherit;
  transition: border-color 0.2s, background-color 0.2s;
}

.form-input:focus {
  background-color: #ffffff;
  border-color: #007aff;
}
.error {
  color: red;
  font-size: 14px;
}
button {
  width: 100%;
  margin-top: 2rem;
  padding: 0.5rem 1rem;
  box-sizing: border-box;
  background-color: #34c759;
  color: #ffffff;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: -0.2px;
  box-shadow: 0 4px 12px rgba(52, 199, 89, 0.2);
  cursor: pointer;
  transition: background-color 0.2s, transform 0.1s;
  z-index: 100;
}


</style>