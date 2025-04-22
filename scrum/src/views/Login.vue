<template>
  <div>
    <div class="flex justify-center mt-12">
      <label class="text-5xl font-noto">LOGIN</label>
    </div>
    <div class="flex justify-center">
      <div class="w-1/3">
        <div class="flex flex-col mt-20 gap-2">
          <label>username</label>
          <input
            type="text"
            v-model="username"
            class="border-2 border-gray-300 rounded-md p-2 focus:outline-none"
            placeholder="username"
          />
        </div>
        <div class="flex flex-col mt-10 gap-2">
          <label>password</label>
          <input
            type="text"
            v-model="password"
            class="border-2 border-gray-300 rounded-md p-2 focus:outline-none"
            placeholder="password"
          />
        </div>
      </div>
    </div>
    <div class="px-10">
      <hr class="my-8 border-gray-400" />
    </div>
    <div class="space-y-24">
      <div class="flex justify-center">
        <GoogleLogin :callback="callback" />
      </div>
      <button
        @click="login"
        class="bg-blue-300 px-6 py-2 rounded-md text-sm block mx-auto"
      >
        login
      </button>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useAuthStore } from "../stores/auth";
// import { useGoogleLogin } from 'vue3-google-login'

const username = ref("");
const password = ref("");
const auth = useAuthStore();

const login = () => {
  if (username.value && password.value) {
    auth.login(username.value);
    console.log("Logged in as", auth.username);
  } else {
    alert("Please enter username and password");
  }
};
const callback = (response) => {
  // This callback will be triggered when the user selects or login to
  // his Google account from the popup
  console.log("Handle the response", response)
}

// const { signIn } = useGoogleLogin({
//   onSuccess: (response) => {
//     console.log('Google login success', response)
//     auth.loginWithGoogle(response)
//   },
//   onError: (err) => {
//     console.error('Google login failed', err)
//     alert('Google login failed')
//   }
// })

// const loginWithGoogle = () => {
//   signIn()
// }
</script>
<style scoped></style>
