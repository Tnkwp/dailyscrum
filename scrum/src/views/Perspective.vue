<template>
  <div class="min-h-screen bg-[#F0FDF4] font-sans">

    <div class=" p-6">
      <div class="flex justify-between items-center text-black">
        <h1 class="text-lg font-medium">Project’s Title : <span class="font-semibold">Project Title</span></h1>
        <p>DATE : XX/XX/XXXX</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div class="lg:col-span-2 space-y-4">
          <div v-for="(member, index) in scrumMembers" :key="index" class="bg-white p-4 rounded-lg shadow">
            <div class="flex justify-between items-center mb-2">
              <div class="flex items-center space-x-3">
                <div class="w-10 h-10 bg-gray-300 rounded-full"></div>
                <div class="font-semibold">Firstname Lastname</div>
              </div>
              <span class="bg-gray-200 text-xs px-3 py-1 rounded-full">{{ member.role }}</span>
            </div>
            <p><strong>สิ่งที่ทำวันนี้</strong><br/>{{ member.today }}</p>
            <p><strong>ปัญหา</strong><br/>{{ member.problem }}</p>
            <p><strong>พรุ่งนี้จะทำอะไร</strong><br/>{{ member.tomorrow }}</p>
          </div>
        </div>

        <div>
          <div class="bg-white rounded-lg p-4 shadow">
            <h2 class="text-xl font-semibold mb-4 text-center">Scrum’s Summary</h2>
            <div class="mb-2">
              <p class="font-bold">คนที่ส่งแล้ว</p>
              <ul class="ml-4 text-sm space-y-1">
                <li v-for="(p, i) in submitted" :key="'submitted-'+i">- {{ p.name }} ({{ p.role }})</li>
              </ul>
            </div>
            <p class="font-bold mt-4">คนที่ยังไม่ได้ส่ง</p>
            <ul class="ml-4 text-sm space-y-1">
              <li v-for="(p, i) in notSubmitted" :key="'not-'+i">- {{ p.name }} ({{ p.role }})</li>
            </ul>

            <div class="mt-4 text-sm">
              <p><strong>Sprint:</strong> 1</p>
              <p><strong>Deadline Date:</strong> XX/XX/XXXX</p>
            </div>
          </div>

          <div class="space-y-4 mt-6">
            <button class="w-full bg-white text-gray-700 border border-gray-300 rounded-lg py-2 hover:bg-gray-50">Create Daily-scrum</button>
            <button class="w-full bg-white text-gray-700 border border-gray-300 rounded-lg py-2 hover:bg-gray-50">Mark Project as done</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const scrumMembers = ref([
  {
    role: 'BA',
    today: 'ตาม Requirements จากลูกค้า',
    problem: 'ปัญหาไม่มี',
    tomorrow: 'จัดการ Requirements ที่ได้จากลูกค้า',
  },
  {
    role: 'Back-end',
    today: 'ทำ Schema',
    problem: 'ปัญหาไม่มี',
    tomorrow: 'วางโครงสร้าง Database',
  },
  {
    role: 'UX/UI',
    today: 'ออกแบบหน้าบ้าน Home',
    problem: 'ปัญหาไม่มี',
    tomorrow: 'ออกแบบหน้าบ้านต่อ',
  }
])

const submitted = ref([
  { name: 'Firstname Lastname', role: 'BA' },
  { name: 'Firstname Lastname', role: 'UX/UI' },
  { name: 'Firstname Lastname', role: 'Back-end' },
  { name: 'Firstname Lastname', role: 'Front-end' },
])

const notSubmitted = ref([
  { name: 'Firstname Lastname', role: 'Back-end' },
  { name: 'Firstname Lastname', role: 'SA' },
  { name: 'Firstname Lastname', role: 'Front-end' },
])
</script>

<style scoped>
</style>
