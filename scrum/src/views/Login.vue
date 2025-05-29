<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gray-50"
    :style="{
      backgroundImage: `url('/bg1.avif')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }"
  >
    <div
      class="w-full max-w-md bg-white rounded-lg shadow-xl p-10 flex flex-col items-center"
    >
      <div class="flex justify-center mb-12">
        <label class="text-5xl font-noto">LOGIN</label>
      </div>
      <div class="flex flex-col w-full gap-2">
        <label>username</label>
        <input
          type="text"
          v-model="username"
          class="border-2 border-gray-300 rounded-md p-2 focus:outline-none"
          placeholder="username"
          autocomplete="username"
        />
      </div>
      <div class="flex flex-col w-full mt-6 gap-2">
        <label>password</label>
        <input
          type="password"
          v-model="password"
          class="border-2 border-gray-300 rounded-md p-2 focus:outline-none"
          placeholder="password"
          autocomplete="current-password"
        />
      </div>
      <div class="flex justify-center w-full mt-8">
        <button
          @click="login"
          class="bg-blue-500 w-full text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Login
        </button>
      </div>

      <!-- Divider: OR -->
      <div class="flex items-center my-6 w-full">
        <div class="flex-grow border-t border-gray-300"></div>
        <span class="mx-4 text-gray-500">or</span>
        <div class="flex-grow border-t border-gray-300"></div>
      </div>

      <div class="flex justify-center w-full">
        <button
          @click="loginWithGoogle"
          class="bg-red-500 w-full text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/auth";

// console.log(BACKEND_URL)
const router = useRouter();
const userStore = useUserStore();
const username = ref("");
const password = ref("");

// Replace this with your real backend URL (using .env or hardcoded)
const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

async function login() {
  try {
    const res = await axios.post(
      `${backendUrl}/api/user/login`,
      {
        username: username.value,
        password: password.value,
      },
      {
        withCredentials: true,
      }
    );

    alert(res.data.msg);
    localStorage.setItem("token", res.data.token);

    // บันทึกใน Pinia store
    userStore.setUser(username.value, res.data.token);
    router.push("/login-success");
  } catch (error) {
    alert(error.response?.data?.msg || "Login failed");
    console.error("Login error:", error);
  }
}

function loginWithGoogle() {
  const redirectState = encodeURIComponent(window.location.origin);
  window.location.href = `${backendUrl}/auth/google?state=${redirectState}&ngrok-skip-browser-warning=true`;
}
</script>
