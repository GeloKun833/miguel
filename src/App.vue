<template>
  <div id="app">
    <nav v-if="isLoggedIn">
      <button @click="logout">Logout</button>
    </nav>
    <router-view />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isLoggedIn = computed(() => !!localStorage.getItem('user'))

const logout = () => {
  localStorage.removeItem('user')
  router.push('/login')
}
</script>

<style>
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  font-family: 'Poppins', 'Inter', system-ui, sans-serif;
  color: #333333;
  min-height: 100vh;
}

@media (max-width: 768px) {
  body {
    font-size: 14px;
  }
}

#app {
  min-height: 100vh;
}

nav {
  padding: 10px;
  text-align: right;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
}

nav button {
  background: #f0b90b;
  color: #000;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
}
</style>

