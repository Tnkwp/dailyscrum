<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg p-6 w-full max-w-md shadow-xl relative font-noto">
      <div class="space-y-4">
        <!-- Project Info -->
        <div class="grid grid-cols-3 gap-4">
          <div class="flex flex-col gap-2">
            <label class="text-sm">Project Title</label>
            <input v-model="title" type="text" placeholder="Project Title" class="input" />
          </div>
          <div class="flex flex-col gap-2">
            <label class="text-sm">Deadline Date</label>
            <input v-model="deadline" type="date" class="input" />
          </div>
          <div class="flex flex-col gap-2">
            <label class="text-sm">Daily Scrum Time</label>
            <input v-model="scrumTime" type="time" class="input" />
          </div>
        </div>

        <!-- Description -->
        <textarea v-model="description" placeholder="Description" class="w-full h-24 resize-none border border-gray-300 rounded" />

        <!-- Add Member Section -->
        <div class="flex items-end gap-2">
          <div class="flex items-center gap-3">
            <label class="text-sm">Add Member</label>
            <button @click="addMember" class="bg-[#10B981] text-white px-3 py-2 rounded">+</button>
            
          </div>
        </div>
        <div class="flex gap-2">
          <input v-model="newMember" type="text" placeholder="e.g., username" class=" h-[35px] border border-gray-300 rounded px-3 py-2 text-[14px]" />
          <div class="flex-1">
            <select v-model="position" class="input">
              <option>Position</option>
              <option>PO</option>
              <option>SM</option>
              <option>UX/UI</option>
              <option>Back-end</option>
              <option>Front-end</option>
              <option>Tester</option>
            </select>
          </div>
        </div>

        <!-- Member Tags -->
        <div>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="(member, index) in members"
              :key="index"
              class="bg-gray-200 px-2 py-1 rounded"
            >
              👤 {{ member.name }} ({{ member.role }})
            </span>
          </div>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex justify-end gap-3 mt-6">
        <button @click="$emit('close')" class="px-4 py-1 bg-[#D1FAE5] text-black rounded">Cancel</button>
        <button @click="handleSubmit" class="px-4 py-1 bg-[#10B981] text-white rounded">Confirm</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const title = ref('')
const description = ref('')
const deadline = ref('')
const scrumTime = ref('')
const newMember = ref('')
const position = ref('')
const members = ref([])

const emit = defineEmits(['close', 'submit'])

function addMember() {
  if (newMember.value && position.value) {
    members.value.push({ name: newMember.value, role: position.value })
    newMember.value = ''
    position.value = ''
  }
}

function handleSubmit() {
  const newProject = {
    title: title.value || 'New Project',
    status: 'กำลังดำเนินการ',
    start: new Date().toISOString().split('T')[0],
    end: deadline.value,
    scrumTime: scrumTime.value,
    description: description.value,
    progress: '0%',
    owner: 'คุณ',
    members: members.value
  }
  emit('submit', newProject)
  emit('close')
}
</script>

<style scoped>
.input {
  @apply w-full h-[35px] border border-gray-300 rounded px-3 py-2 text-[14px];
}
</style>
