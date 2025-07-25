<template>
  <div class="fixed w-full z-20">
    <nav
      class="px-4 py-2 w-full shadow-md bg-[#059669] font-noto flex justify-between"
    >
      <div class="flex items-center gap-3">
        <!-- <img src="/images.webp" alt="" class="w-10 h-10 rounded-full" /> -->
        <span class="font-bold">Daily Scrum</span>
      </div>
      <div>
        <div class="flex items-center gap-3">
          <!-- <button>
          <img src="/images.webp" alt="" class="w-10 h-10 rounded-full" />
        </button> -->
        </div>
        <div class="flex justify-end items-center relative">
          <div class="flex gap-2">
            <button>
              <NotificationBell />
            </button>
            <button
              v-if="user"
              @click="toggleMenu"
              class="bg-gray-200 rounded-full flex items-center"
            >
              <img
                :src="user.profile_pic"
                referrerpolicy="no-referrer"
                alt="profile"
                class="w-7 h-7 border-2 border-gray-300 rounded-full"
              />
            </button>
          </div>
          <div
            v-if="showMenu"
            class="absolute right-0 top-10 mt-2 w-32 bg-white shadow rounded z-10 w-[170px] px-2 py-2"
          >
            <div class="flex justify-center border-b gap-2">
              <div>
                <span>{{ user.firstname }}</span>
              </div>
              <div>
                <span>{{ user.lastname }}</span>
              </div>
            </div>
            <router-link
              to="/editprofile"
              @click="showMenu = false"
              class="block w-full text-left py-2 hover:bg-gray-100 border-b"
            >
              Edit Profile
            </router-link>
            <button
              @click="handleLogout"
              class="block w-full text-left py-2 hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup>
import { onMounted, ref, onBeforeUnmount } from "vue";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
import NotificationBell from "./NotificationBell.vue";

const user = ref(null);
const showMenu = ref(false);
const token = ref(null);
const router = useRouter();
const route = useRoute();

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

const closeMenuOnClickOutside = (event) => {
  // Click outside menu closes it
  const button = document.querySelector("button.bg-gray-200");
  const menu = document.querySelector(".absolute.right-0.top-10");
  if (
    showMenu.value &&
    !button?.contains(event.target) &&
    !menu?.contains(event.target)
  ) {
    showMenu.value = false;
  }
};

onMounted(async () => {
  document.addEventListener("click", closeMenuOnClickOutside);
  const urlToken = route.query.token;
  if (urlToken) {
    token.value = urlToken;
    localStorage.setItem("token", token.value);
  } else {
    token.value = localStorage.getItem("token");
  }
  if (!token.value) {
    console.error("No token found. Please log in.");
    return;
  }
  try {
    const response = await axios.get(`${BACKEND_URL}/api/users/profile`, {
      headers: {
        Authorization: `Bearer ${token.value}`,
        "ngrok-skip-browser-warning": "true",
      },
      withCredentials: true,
    });
    user.value = response.data.user;
  } catch (err) {
    // Handle 401/403 errors by logging out user
    if (err.response?.status === 401 || err.response?.status === 403) {
      localStorage.removeItem("token");
      router.push("/");
    }
    console.error("Error details:", {
      message: err.message,
      response: err.response?.data,
      status: err.response?.status,
    });
  }
});

onBeforeUnmount(() => {
  document.removeEventListener("click", closeMenuOnClickOutside);
});

const toggleMenu = (event) => {
  showMenu.value = !showMenu.value;
};

function handleLogout() {
  localStorage.removeItem("token");
  router.push("/");
}
</script>
