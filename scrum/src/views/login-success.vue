<template>
  <div class="min-h-screen bg-gray-100 p-6 font-noto">
    <!-- Header -->
    <div class="grid grid-cols-3 gap-4 mb-6">
      <div class="col-start-2 justify-center items-center space-x-2 mb-5">
        <select v-model="selectedTopic" class="border px-4 py-2 rounded">
          <option v-for="(topic, index) in topics" :key="index" :value="topic">
            {{ topic }}
          </option>
        </select>
        <button @click="showModal = true" class="bg-gray-200 px-2 rounded-full">
          +
        </button>
      </div>
      <!-- Modal -->
      <div
        v-if="showModal"
        class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      >
        <div class="bg-white p-6 rounded shadow-md w-96">
          <h2 class="text-xl font-semibold text-center mb-4">
            สร้างหัวข้อใหม่
          </h2>

          <label class="block mb-2">ชื่อหัวข้อ</label>
          <input
            type="text"
            v-model="newTopic"
            class="text-gray-400 w-full border px-3 py-2 rounded mb-4"
            placeholder="เช่น หัวข้อ daily-scrum"
          />

          <div class="flex justify-end space-x-4">
            <button @click="cancelModal" class="bg-gray-300 px-4 py-1 rounded">
              ยกเลิก
            </button>
            <button
              @click="addTopic"
              class="bg-blue-500 text-white px-4 py-1 rounded"
            >
              ตกลง
            </button>
          </div>
        </div>
      </div>
      <div class="relative flex justify-end items-center">
        <button
          v-if="user"
          @click="showMenu = !showMenu"
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
      </div>
      <div
        class="col-end-4 flex justify-end items-center"
      >
        <button @click="goToDailyScrumPage" class="bg-blue-400 text-white px-2 py-1 rounded">add daily-scrum</button>
      </div>
    </div>
    <div class="bg-white p-4 rounded shadow">
      <div class="p-4 space-y-6">
        <div
          v-for="(task, index) in tasks"
          :key="index"
          class="p-4 border-b border-gray-200"
        >
          <p class="font-bold mb-2">{{ task.name }}</p>
          <p>{{ task.date }}</p>
          <p>สิ่งที่ทำวันนี้ <br> {{ task.todayWork }}</p>
          <p>สกิลที่ใช้ในการทำงาน <br> {{ task.skillsUsed }}</p>
          <p>ปัญหาที่พบ <br> {{ task.problem }}</p>
          <p>พรุ่งนี้จะทำอะไร <br> {{ task.tomorrowPlan }}</p>
          <div>
            <button @click="showModal2 = true" class="border px-2 py-1 rounded">
              review
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="showModal2"
      class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
    >
      <div>
        <div class="bg-white p-6 rounded shadow-md w-[650px] h-auto">
          <div class="flex justify-end mb-4">
            <button @click="cancelModal" class="text-[15px]">X</button>
          </div>
          <div class="flex justify-end">
            <button @click="showModal3 = true" class="border px-2 py-1 rounded">
              เพิ่ม review
            </button>
          </div>
        </div>
        <div
          v-if="showModal3"
          class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
        >
          <div class="bg-white p-6 rounded shadow-md w-[650px] h-auto">
            <div>
              <label>review</label>
              <textarea
                v-model="form.review"
                class="w-full border p-2 rounded"
                rows="3"
              ></textarea>
            </div>
            <div>
              <label>ให้คะแนน</label>
              <div>
                <div class="flex items-center">
                  <template v-for="star in 5" :key="star">
                    <svg
                      @click="setRating(star)"
                      :class="[
                        'w-6 h-6 cursor-pointer',
                        star <= rating
                          ? 'text-yellow-300'
                          : 'text-gray-300 dark:text-gray-500',
                      ]"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 20"
                    >
                      <path
                        d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
                      />
                    </svg>
                  </template>
                </div>
              </div>
            </div>
            <div class="flex justify-end space-x-4 mt-4">
              <button
                @click="cancelModal"
                class="bg-gray-300 px-4 py-2 rounded"
              >
                ยกเลิก
              </button>
              <button class="bg-gray-400 px-4 py-2 rounded">โพส</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <button @click="goToInfoPage">Show info</button>
  </div>
</template>

<script setup>
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
import { onMounted, ref } from "vue";

const selectedTopic = ref("หัวข้อ daily-scrum");
const showMenu = ref(false);
const topics = ref(["หัวข้อ daily-scrum", "หัวข้อ 1", "หัวข้อ 2"]);
const route = useRoute();
const error = ref(null);

const showModal = ref(false);
const showModal2 = ref(false);
const showModal3 = ref(false);
const newTopic = ref("");
const review = ref("");
const router = useRouter();
const user = ref(null);
const rating = ref(0);

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const tasks = ref([
  {
    name: "สมชาย ใจดี",
    date: "28/04/2025",
    todayWork: "-พัฒนาเว็บไซต์หน้า dashboard",
    skillsUsed: "-Vue.js, Tailwind CSS, Git",
    problem: "-อินเทอร์เน็ตมีปัญหาในช่วงบ่าย",
    tomorrowPlan: "-ทดสอบระบบ และเริ่มทำหน้า Login",
  },
  {
    name: "สมหญิง แข็งแรง",
    date: "29/04/2025",
    todayWork: "-ออกแบบฐานข้อมูล",
    skillsUsed: "-MySQL, DB Diagram",
    problem: "-เข้าใจไม่ตรงกับลูกค้า",
    tomorrowPlan: "-แก้ไข schema และประชุมอีกครั้ง",
  },
  {
    name: "สมปอง รุ่งเรือง",
    date: "30/04/2025",
    todayWork: "-พัฒนา API backend",
    skillsUsed: "-Node.js, Express, Postman",
    problem: "-พบ error เรื่องการ auth",
    tomorrowPlan: "-แก้ไข middleware และเขียน test case",
  },
]);

const token = ref(null);
onMounted(() => {
  // Check if there's a token in the query parameters
  const urlToken = route.query.token;

  // Only proceed if the token exists in the query
  if (urlToken) {
    token.value = urlToken;

    // Store the token in localStorage
    localStorage.setItem("token", token.value);
  } else {
    // Handle the case where there is no token
    console.error("No token found in the URL.");
  }
});

function goToInfoPage() {
  router.push("/info");
}

onMounted(async () => {
  try {
    console.log("Making request to:", BACKEND_URL); // Debug log

    const token = localStorage.getItem("token");

    // If there's no token, handle it here (e.g., show an alert or redirect)
    if (!token) {
      console.error("No token found. Please log in.");
      return;
    }

    const response = await axios.get(`${BACKEND_URL}/api/user/info`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "ngrok-skip-browser-warning": "true",
      },
      withCredentials: true,
    });

    console.log("Response:", response); // Full response log
    user.value = response.data.info;
  } catch (error) {
    console.error("Error details:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });
  }
});

const handleLogout = async () => {
  error.value = null; // Clear any previous error messages

  try {
    const token = localStorage.getItem("token");

    const response = await axios.post(
      `${BACKEND_URL}/api/user/logout`,
      {}, // no request body
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );

    // Clear token from localStorage (client-side logout)
    localStorage.removeItem("token");

    router.push("/"); // Redirect to home page
  } catch (err) {
    if (err.response) {
      error.value = err.response.data.message || "Logout failed.";
    } else {
      error.value = "Network error";
    }
  }
};

function setRating(value) {
  rating.value = value;
}

const goToDailyScrumPage = () => {
  router.push("/add-daily");
};

const form = ref({
  name: "",
  date: "",
  today: "",
  environment: "",
  problem: "",
  tomorrow: "",
});

const submitScrum = () => {
  console.log("Form submitted:", form.value);
  // Add submission logic here (e.g., save to backend or Firebase)
};

const addTopic = () => {
  if (newTopic.value.trim() !== "") {
    topics.value.push(newTopic.value.trim());
    selectedTopic.value = newTopic.value.trim();
    newTopic.value = "";
    showModal.value = false;
  }
};

const cancelModal = () => {
  newTopic.value = "";
  review.value = "";
  rating.value = 0;
  showModal.value = false;
  showModal2.value = false;
  showModal3.value = false;
};
</script>

<style scoped>
/* Optional styles can go here */
</style>
