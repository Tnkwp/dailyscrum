<template>
  <div class="min-h-screen bg-gray-100 p-6 font-noto">
    <!-- Loading User -->

    <div>
      <!-- Header -->
      <div class="grid grid-cols-3 gap-4 mb-6">
        <div class="col-start-2 justify-center items-center">
          <!-- 🔽 Dropdown Filter -->
          <select
            v-model="selectedTitle"
            class="border p-2 rounded w-[150px] mb-2"
          >
            <option value="">ทั้งหมด</option>
            <option
              v-for="option in titleOptions"
              :key="option"
              :value="option"
            >
              {{ option }}
            </option>
          </select>
          <button
            @click="showModal = true"
            class="bg-gray-200 px-2 rounded-full ml-2"
          >
            +
          </button>
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
        <!-- ปุ่ม add daily-scrum ย้ายมา col-span-1 ขวาสุด -->
        <div class="col-end-4 flex justify-end items-center">
          <button
            @click="goToDailyScrumPage"
            class="bg-blue-400 text-white px-2 py-1 rounded"
          >
            add daily-scrum
          </button>
        </div>
      </div>
      <div class="bg-white p-4 rounded shadow">
        <div class="p-4 space-y-6">
          
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
                v-model="title_name"
                class="text-gray-400 w-full border px-3 py-2 rounded mb-4"
                placeholder="เช่น หัวข้อ daily-scrum"
              />

              <div class="flex justify-end space-x-4">
                <button
                  @click="cancelModal"
                  class="bg-gray-300 px-4 py-1 rounded"
                >
                  ยกเลิก
                </button>
                <button
                  @click="addNewTitle"
                  class="bg-blue-500 text-white px-4 py-1 rounded"
                >
                  ตกลง
                </button>
              </div>
            </div>
          </div>
          <div v-if="!user">
            <p>Loading user info...</p>
          </div>
          <!-- 🔁 รายการ DailyScrum -->
          <div
            v-for="dailyScrum in filteredDailyScrums"
            :key="dailyScrum._id"
            class="p-4 border-b border-gray-200"
          >
            <p class="font-bold mb-2">
              {{ dailyScrum.writer }}
              <label class="font-semibold text-[11px]">{{
                formatDate(dailyScrum.createdAt)
              }}</label>
            </p>
            <p>สิ่งที่ทำวันนี้ <br />{{ dailyScrum.daily }}</p>
            <p>สกิลที่ใช้ในการทำงาน <br />{{ dailyScrum.properties }}</p>
            <p>ปัญหาที่พบ <br />{{ dailyScrum.problem }}</p>
            <p>พรุ่งนี้จะทำอะไร <br />{{ dailyScrum.todo }}</p>
            <button @click="showModal2 = true" class="border px-2 py-1 rounded">
              review
            </button>
          </div>
        </div>
      </div>
      <!-- Modal Layer 2 -->
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
              <button
                @click="showModal3 = true"
                class="border px-2 py-1 rounded"
              >
                เพิ่ม review
              </button>
            </div>
            <span class="text-[18px] font-"> รีวิว </span>
          </div>
          <!-- Modal Layer 3 -->
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
  </div>
</template>

<script setup>
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
import { onMounted, ref, computed } from "vue";
import Filterdaily from "../components/filterdaily.vue";

const showMenu = ref(false);
const route = useRoute();
const error = ref(null);
const showModal = ref(false);
const showModal2 = ref(false);
const showModal3 = ref(false);
const review = ref("");
const router = useRouter();
const user = ref(null);
const rating = ref(0);
const dailyScrums = ref([]);
const selectedTitle = ref("");
const titleOptions = ref([]);
const title_name = ref("");
const token = ref(null);
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

// รวม onMounted เป็นครั้งเดียว จัดการ token และ load user + data พร้อมกัน
onMounted(async () => {
  // รับ token จาก query หรือ localStorage
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
  // โหลด user info
  try {
    const response = await axios.get(`${BACKEND_URL}/api/user/info`, {
      headers: {
        Authorization: `Bearer ${token.value}`,
        "ngrok-skip-browser-warning": "true",
      },
      withCredentials: true,
    });
    user.value = response.data.info;
  } catch (error) {
    console.error("Error details:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });
  }
  // โหลด daily scrum
  fetchDailyScrum();
});

const fetchDailyScrum = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found. Please log in.");
      return;
    }
    const response = await axios.get(`${BACKEND_URL}/api/daily-scrum`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "ngrok-skip-browser-warning": "true",
      },
      withCredentials: true,
    });
    dailyScrums.value = response.data.dailyScrums || [];
    const titles = dailyScrums.value.map((item) => item.title).filter(Boolean);
    titleOptions.value = [...new Set(titles)];
  } catch (error) {
    console.error("Error fetching daily scrum:", error);
  }
};

const filteredDailyScrums = computed(() => {
  if (!selectedTitle.value) return dailyScrums.value || [];
  return (dailyScrums.value || []).filter(
    (item) => item.title === selectedTitle.value
  );
});

const addNewTitle = async () => {
  const trimmed = title_name.value.trim();
  if (trimmed && !titleOptions.value.includes(trimmed)) {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${BACKEND_URL}/api/title`,
        { title_name: trimmed },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "true",
          },
          withCredentials: true,
        }
      );
      // backend ตอบกลับ { "title_name": "title1" }
      const newTitle = res.data?.title_name ?? trimmed;

      titleOptions.value.push(newTitle);
      selectedTitle.value = newTitle;
      title_name.value = "";
      showModal.value = false;
      console.log("New title added:", newTitle);
    } catch (error) {
      alert("เกิดข้อผิดพลาดในการเพิ่มหัวข้อ");
      console.error(error);
    }
  }
};

function goToInfoPage() {
  router.push("/info");
}

const handleLogout = async () => {
  error.value = null;
  try {
    const token = localStorage.getItem("token");
    await axios.post(
      `${BACKEND_URL}/api/user/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );
    localStorage.removeItem("token");
    router.push("/");
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
  router.push({ path: "/add-daily", query: { title: selectedTitle.value } });
};

const form = ref({
  review: "",
  name: "",
  date: "",
  today: "",
  environment: "",
  problem: "",
  tomorrow: "",
});

const submitScrum = () => {
  // Add submission logic here
  console.log("Form submitted:", form.value);
};

const cancelModal = () => {
  review.value = "";
  rating.value = 0;
  showModal2.value = false;
  showModal3.value = false;
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear() + 543;
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${day}/${month}/${year} ${hours}:${minutes}`;
};
</script>

<style scoped></style>
