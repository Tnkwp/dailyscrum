<template>
  <div class="fixed w-full z-20">
    <nav
      class="px-4 py-2 w-full shadow-md bg-[#059669] font-noto flex justify-between"
    >
      <div class="flex items-center gap-3">
        <!-- <img src="/images.webp" alt="" class="w-10 h-10 rounded-full" /> -->
        <span class="font-bold">Daily Scrum</span>
      </div>
      <div class="flex items-center gap-3">
        <button>
          <img src="/bell.png" alt="" class="w-[20px]" />
        </button>
        <button>
          <img src="/images.webp" alt="" class="w-10 h-10 rounded-full" />
        </button>
      </div>
      <!-- <div class="flex justify-end items-center relative">
        <button
          v-if="user"
          @click="toggleMenu"
          class="bg-gray-200 px-4 py-1 rounded flex items-center"
        >
          {{ user.username }}
          <img
            :src="user.profilePic"
            referrerpolicy="no-referrer"
            alt="profile"
            class="w-6 h-6 border-2 border-gray-300 rounded-full ms-2"
          />
        </button>
        <div
          v-if="showMenu"
          class="absolute right-0 top-10 mt-2 w-32 bg-white shadow rounded z-10"
        >
          <button
            @click="handleLogout"
            class="block w-full text-left px-4 py-2 hover:bg-gray-100"
          >
            logout
          </button>
        </div>
      </div> -->
    </nav>
  </div>
</template>

<script setup>
// import { onMounted, ref, onBeforeUnmount } from "vue";
// import axios from "axios";
// import { useRoute, useRouter } from "vue-router";

// const user = ref(null);
// const showMenu = ref(false);
// const error = ref(null);
// const token = ref(null);
// const router = useRouter();
// const route = useRoute();

// const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

// const closeMenuOnClickOutside = (event) => {
//   // Click outside menu closes it
//   const button = document.querySelector("button.bg-gray-200");
//   const menu = document.querySelector(".absolute.right-0.top-10");
//   if (
//     showMenu.value &&
//     !button?.contains(event.target) &&
//     !menu?.contains(event.target)
//   ) {
//     showMenu.value = false;
//   }
// };

// onMounted(async () => {
//   document.addEventListener("click", closeMenuOnClickOutside);
//   const urlToken = route.query.token;
//   if (urlToken) {
//     token.value = urlToken;
//     localStorage.setItem("token", token.value);
//   } else {
//     token.value = localStorage.getItem("token");
//   }
//   if (!token.value) {
//     console.error("No token found. Please log in.");
//     return;
//   }
//   try {
//     const response = await axios.get(`${BACKEND_URL}/api/user/info`, {
//       headers: {
//         Authorization: `Bearer ${token.value}`,
//         "ngrok-skip-browser-warning": "true",
//       },
//       withCredentials: true,
//     });
//     user.value = response.data.info;
//   } catch (err) {
//     // Handle 401/403 errors by logging out user
//     if (err.response?.status === 401 || err.response?.status === 403) {
//       localStorage.removeItem("token");
//       router.push("/");
//     }
//     console.error("Error details:", {
//       message: err.message,
//       response: err.response?.data,
//       status: err.response?.status,
//     });
//   }
// });

// onBeforeUnmount(() => {
//   document.removeEventListener("click", closeMenuOnClickOutside);
// });

// const toggleMenu = (event) => {
//   showMenu.value = !showMenu.value;
// };

// const handleLogout = async () => {
//   error.value = null;
//   try {
//     const storedToken = localStorage.getItem("token");
//     await axios.post(
//       `${BACKEND_URL}/api/user/logout`,
//       {},
//       {
//         headers: {
//           Authorization: `Bearer ${storedToken}`,
//         },
//         withCredentials: true,
//       }
//     );
//     localStorage.removeItem("token");
//     user.value = null;
//     router.push("/");
//   } catch (err) {
//     if (err.response) {
//       error.value = err.response.data.message || "Logout failed.";
//     } else {
//       error.value = "Network error";
//     }
//   }
// };
</script>
