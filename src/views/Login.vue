<template>
  <div class="login-container">
    <div class="login-header">
      <h2>Welcome Back</h2>
      <p>Sign in to your account</p>
    </div>
    <form @submit.prevent="login" class="login-form">
      <div class="input-group">
        <label for="email">Email</label>
        <input
          id="email"
          v-model="email"
          type="email"
          placeholder="Enter your email"
          required
        />
      </div>
      <div class="input-group">
        <label for="password">Password</label>
        <input
          id="password"
          v-model="password"
          type="password"
          placeholder="Enter your password"
          required
        />
      </div>
      <button type="submit" class="login-btn">Login</button>
    </form>
    <div class="login-footer">
      <p>
        Don't have an account?
        <router-link to="/register" class="register-link">Register here</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('')
const password = ref('')

const login = () => {
  const users = JSON.parse(localStorage.getItem('users') || '[]')
  const user = users.find(
    (u) => u.email === email.value && u.password === password.value,
  )
  if (user) {
    localStorage.setItem('user', JSON.stringify(user))
    router.push('/calculator')
  } else {
    alert('Invalid credentials')
  }
}
</script>

<style scoped>
.login-container {
  max-width: 450px;
  margin: 100px auto;
  padding: 40px;
  background: linear-gradient(135deg, #ffffff, #f0f8ff);
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
}

.login-header {
  text-align: center;
  margin-bottom: 30px;
}

.login-header h2 {
  color: #333;
  font-size: 2.5rem;
  margin-bottom: 10px;
  font-weight: 700;
  background: linear-gradient(135deg, #f0b90b, #f8d12f);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

@media (max-width: 768px) {
  .login-header h2 {
    font-size: 2rem;
  }
}

.login-header p {
  color: #666;
  font-size: 1.1rem;
  margin: 0;
}

.login-form {
  margin-bottom: 30px;
}

.input-group {
  margin-bottom: 20px;
}

.input-group label {
  display: block;
  margin-bottom: 8px;
  color: #333;
  font-weight: 600;
  font-size: 0.9rem;
}

.input-group input {
  width: 100%;
  padding: 15px;
  border: 2px solid #e1e5e9;
  border-radius: 12px;
  font-size: 1rem;
  background: #ffffff;
  color: #333;
  transition: all 0.3s ease;
  box-sizing: border-box;
}

.input-group input:focus {
  outline: none;
  border-color: #f0b90b;
  box-shadow: 0 0 0 3px rgba(240, 185, 11, 0.1);
}

.login-btn {
  width: 100%;
  padding: 15px;
  background: linear-gradient(135deg, #f0b90b, #f8d12f);
  color: #000;
  border: none;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(240, 185, 11, 0.3);
}

.login-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(240, 185, 11, 0.4);
}

.login-footer {
  text-align: center;
}

.login-footer p {
  color: #666;
  margin: 0;
}

.register-link {
  color: #f0b90b;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;
}

.register-link:hover {
  color: #e6a800;
  text-decoration: underline;
}
</style>

