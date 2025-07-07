<template>
  <div class="bg-white rounded-lg p-4 shadow-md relative">
    <span
      class="absolute top-2 right-2 px-2 py-1 text-xs rounded-full text-white"
      :class="{
        'bg-red-500': status === 'หยุดทำการ',
        'bg-green-500': status === 'กำลังดำเนินการ'
      }"
    >
      {{ status }}
    </span>

    <p class="font-semibold text-gray-800 mb-2">{{ title }}</p>
    <p class="text-sm text-gray-500">Start: {{ start }}</p>
    <p class="text-sm text-gray-500">Deadline: {{ end }}</p>
    <p class="text-sm text-gray-500">Owner: {{ owner }}</p>

    <div class="flex gap-2 mt-2">
      <span
        v-for="(member, index) in members"
        :key="index"
        class="bg-gray-200 rounded-full w-7 h-7 flex items-center justify-center text-sm"
      >
        {{ member }}
      </span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  status: String,
  start: String,
  end: String,
  progress: String,
  owner: String,
  members: Array
})
</script>
