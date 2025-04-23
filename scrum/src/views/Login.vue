<template>
  <div class="flex justify-center"> 
    <div class="w-1/3">
      <div class="flex justify-center mt-20">
        <label class="text-5xl font-noto">LOGIN</label>
      </div>
      <div class="flex flex-col mt-20 gap-2">
        <label>username</label>
        <input type="text" v-model="username" class="border-2 border-gray-300 rounded-md p-2 focus:outline-none"
          placeholder="username" />
      </div>
      <div class="flex flex-col mt-10 gap-2">
        <label>password</label>
        <input type="text" v-model="password" class="border-2 border-gray-300 rounded-md p-2 focus:outline-none"
          placeholder="password" />
      </div>
      <div class="flex justify-center mt-10">
        <button @click="login" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Login
      </button>
      </div>
    </div>
  </div>
  <div class="flex justify-center items-center mt-10">
    <button @click="loginWithGoogle">Sign in with Google</button>
  </div>
</template>

<script setup>
import { ref } from "vue"
import axios from "axios"
import { useRouter } from "vue-router"
// const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// console.log(BACKEND_URL)
const router = useRouter()

const username = ref("")
const password = ref("")

// Replace this with your real backend URL (using .env or hardcoded)
const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000"

async function login() {
  try {
    const res = await axios.post(`${backendUrl}/api/user/login`, {
      username: username.value,
      password: password.value,
    }, {
      withCredentials: true
    })


    alert(res.data.message) // or redirect or update store
    localStorage.setItem("token", res.data.token)

    console.log("Login successful:", res.data)
    router.push('/login-success')
  } catch (error) {
    alert(error.response?.data?.message || "Login failed")
    console.error("Login error:", error)
  }
}

function loginWithGoogle() {
  window.location.href = `${backendUrl}/auth/google?ngrok-skip-browser-warning=true`;
}

</script>
