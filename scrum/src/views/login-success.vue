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
        <button @click="showModal = true" class="bg-gray-200 px-2 py-1 rounded">
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
      <div @click="goToDailyScrumPage" class="flex justify-end items-center">
        <button class="bg-gray-200 px-2 py-1 rounded">add daily-scrum</button>
      </div>
      <!-- <div class="relative">
        <button @click="showMenu = !showMenu" class="bg-gray-200 px-4 py-1 rounded flex items-center">
          username <span class="ml-2 bg-red-500 h-3 w-3 rounded-full"></span>
        </button>
        <div v-if="showMenu" class="absolute right-0 mt-2 w-32 bg-white shadow rounded z-10">
          <button class="block w-full text-left px-4 py-2 hover:bg-gray-100">add daily...</button>
          <button class="block w-full text-left px-4 py-2 hover:bg-gray-100">logout</button>
        </div>
      </div> -->
    </div>
    <div class="bg-white p-4 rounded shadow">
      <p class="font-bold mb-2">ชื่อ</p>
      <p>dd/mm/yyyy</p>
      <p>สิ่งที่ทำวันนี้</p>
      <p>สภาพที่ใช้ในการทำงาน</p>
      <p>ปัญหาที่พบ</p>
      <p>พรุ่งนี้จะทำอะไร</p>
      <div>
        <button @click="showModal2 = true" class="border px-2 py-1 rounded">
          comment
        </button>
      </div>
    </div>
    <div
      v-if="showModal2"
      class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
    >
      <div>
        <div class="bg-white p-6 rounded shadow-md w-[650px] h-auto">
          <div class="flex justify-end">
            <button @click="showModal3 = true" class="border px-2 py-1 rounded">เพิ่ม review</button>
          </div>
        </div>
        <div v-if="showModal3" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div class="bg-white p-6 rounded shadow-md w-[650px] h-auto"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const selectedTopic = ref("หัวข้อ daily-scrum");
const showMenu = ref(false);
const topics = ref(["หัวข้อ daily-scrum", "หัวข้อ 1", "หัวข้อ 2"]);
import { useRouter } from "vue-router";

const showModal = ref(false);
const showModal2 = ref(false);
const showModal3 = ref(false);
const newTopic = ref("");
const router = useRouter();

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
  showModal.value = false;
};
</script>

<style scoped>
/* Optional styles can go here */
</style>
