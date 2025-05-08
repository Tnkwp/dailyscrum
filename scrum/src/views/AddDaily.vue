<template>
  <div class="min-h-screen bg-white p-6 font-noto">
    <!-- Back button -->
    <div class="mb-4">
      <button @click="goBack" class="text-red-500 text-xl">◀</button>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-4 max-w-3xl mx-auto">
      <div class="w-1/4">
        <Datepicker v-model="form.createdAt" format="dd/MM/yyyy" />
      </div>

      <!-- Daily Scrum -->
      <div>
        <label class="block font-noto font-semibold mb-1"
          >Daily-scrum สิ่งที่ทำวันนี้</label
        >
        <textarea
          v-model="form.dailyScrum"
          class="w-full border p-2 rounded"
          rows="3"
        ></textarea>
      </div>

      <!-- Properties -->
      <div>
        <label class="block font-noto font-semibold mb-1"
          >Proptoties สกิลที่ใช้ในการทำงาน</label
        >
        <input v-model="form.properties" class="w-full border p-2 rounded focus:outline-none" />
      </div>

      <!-- Problem -->
      <div>
        <label class="block font-noto font-semibold mb-1">Problem ปัญหาที่พบ</label>
        <textarea
          v-model="form.problem"
          class="w-full border p-2 rounded"
          rows="3"
        ></textarea>
      </div>

      <!-- Todo -->
      <div>
        <label class="block font-noto font-semibold mb-1">Todo พรุ่งนี้จะทำอะไร</label>
        <textarea
          v-model="form.todo"
          class="w-full border p-2 rounded"
          rows="3"
        ></textarea>
      </div>

      <!-- File upload -->
      <div>
        <div class="flex items-center justify-center w-full">
          <label
            for="files"
            class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
          >
            <div class="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span class="font-semibold"> Click to upload</span> or drag and
                drop
              </p>
            </div>
            <input
              id="files"
              type="file"
              class="hidden"
              @change="handleFileChange"
            />
          </label>
        </div>
      </div>

      <!-- Buttons -->
      <div class="flex justify-center space-x-4 mt-6 font-noto">
        <button
          type="button"
          @click="handleCancel"
          class="bg-red-500 px-4 py-2 rounded text-white"
        >
          ยกเลิก
        </button>
        <button type="submit" class="bg-green-600 px-4 py-2 rounded">
          โพส
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import "flowbite";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

const form = ref({
  createdAt: "",
  daily: "",
  properties: "",
  problem: "",
  todo: "",
  files: null,
});

const goBack = () => {
  window.history.back();
};

const handleFileChange = (event) => {
  form.value.file = event.target.files[0];
};

const handleCancel = () => {
  form.value = {
    date: "",
    dailyScrum: "",
    properties: "",
    problem: "",
    todo: "",
    file: null,
  };
};

const handleSubmit = () => {
  console.log("Form submitted:", form.value);
  // Add your submit logic here
};
</script>

<style scoped>
/* Optional additional styling */
</style>
