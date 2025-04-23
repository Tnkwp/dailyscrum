<template>
  <div class="min-h-screen bg-white p-6">
    <!-- Back button -->
    <div class="mb-4">
      <button @click="goBack" class="text-red-500 text-xl">◀</button>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-4 max-w-3xl mx-auto">

      <div class="relative w-1/4">
        <div
          class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none"
        >
          <svg
            class="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"
            />
          </svg>
        </div>
        <input
          datepicker
          id="default-datepicker"
          type="text"
          v-model="form.date"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Select date"
        />
      </div>

      <!-- Daily Scrum -->
      <div>
        <label class="block font-semibold mb-1"
          >daily-scrum สิ่งที่ทำวันนี้</label
        >
        <textarea
          v-model="form.dailyScrum"
          class="w-full border p-2 rounded"
          rows="3"
        ></textarea>
      </div>

      <!-- Properties -->
      <div>
        <label class="block font-semibold mb-1"
          >proptoties สกิลที่ใช้ในการทำงาน</label
        >
        <input v-model="form.properties" class="w-full border p-2 rounded" />
      </div>

      <!-- Problem -->
      <div>
        <label class="block font-semibold mb-1">problem ปัญหาที่พบ</label>
        <textarea
          v-model="form.problem"
          class="w-full border p-2 rounded"
          rows="3"
        ></textarea>
      </div>

      <!-- Todo -->
      <div>
        <label class="block font-semibold mb-1">todo พรุ่งนี้จะทำอะไร</label>
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
            for="dropzone-file"
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
                <span class="font-semibold">Click to upload</span> or drag and
                drop
              </p>
              <p class="text-xs text-gray-500 dark:text-gray-400">
                SVG, PNG, JPG or GIF (MAX. 800x400px)
              </p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              class="hidden"
              @change="handleFileChange"
            />
          </label>
        </div>
      </div>

      <!-- Buttons -->
      <div class="flex justify-center space-x-4 mt-6">
        <button
          type="button"
          @click="handleCancel"
          class="bg-gray-300 px-4 py-2 rounded"
        >
          ยกเลิก
        </button>
        <button type="submit" class="bg-gray-400 px-4 py-2 rounded">โพส</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import 'flowbite'

const form = ref({
  date: "",
  dailyScrum: "",
  properties: "",
  problem: "",
  todo: "",
  file: null,
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
