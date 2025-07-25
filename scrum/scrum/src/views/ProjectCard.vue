<template>
  <div class="bg-white rounded-xl p-4 shadow-md relative w-[280px] h-[160px] text-sm">
    <!-- Status badge -->
    <span
  class="absolute top-2 right-10 text-white text-xs px-3 py-1 rounded-full"
  :class="{
    'bg-red-400': status === 'In progress',
    'bg-green-400': status === 'Done'
  }"
>
  {{ status || 'In progress' }}
</span>

    <!-- Pin icon -->
    <button class="absolute top-2 right-2">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M16 3v4l4 4-4 4v4l-4-4-4 4v-4l-4-4 4-4V3l4 4 4-4z" />
      </svg>
    </button>

    <!-- Title and basic info -->
    <div class="mb-1">
      <p class="font-semibold text-gray-800">{{ title || "Project's Title" }}</p>
    </div>

    <div class="flex justify-between text-xs text-gray-500 mb-2">
      <p>{{ progress || 'Sprint X' }}</p>
      <p>Deadline: {{ end || 'XX/XX/XXXX' }}</p>
    </div>

    <!-- Owner and Members -->
    <div class="flex items-start justify-start mt-3 text-gray-600 text-xs gap-4">
      <!-- Owner -->
      <div class="flex flex-col items-center">
        <p class="mb-1">Owner</p>
        <img
          :src="owner"
          alt="owner"
          class="w-6 h-6 rounded-full bg-gray-300"
        />
      </div>

      <!-- Members -->
      <div class="flex flex-col">
        <p class="mb-1">Member</p>
        <div class="flex gap-1">
          <img
            v-for="(member, index) in members"
            :key="index"
            :src="member"
            alt="member"
            class="w-6 h-6 rounded-full bg-gray-300"
          />
        </div>
      </div>
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
  members: {
    type: Array,
    default: () => []
  }
})
</script>
