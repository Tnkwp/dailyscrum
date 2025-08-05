<template>
  <div
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
  >
    <div class="bg-white rounded-lg p-6 shadow-xl relative font-noto w-[600px]">
      <div class="space-y-4">
        <!-- Project Info -->
        <div class="grid grid-cols-3 gap-4">
          <div class="flex flex-col gap-2">
            <label class="text-sm">Project Title</label>
            <input
              v-model="form.title"
              type="text"
              placeholder="Project Title"
              class="input"
            />
          </div>
          <div class="flex flex-col gap-2">
            <label class="text-sm">Deadline Date</label>
            <input v-model="form.deadline_date" type="date" class="input" />
          </div>
          <div class="flex flex-col gap-2">
            <label class="text-sm">Daily Scrum Time</label>
            <input v-model="form.scrum_time" type="time" class="input" />
          </div>
        </div>

        <!-- Description -->
        <div class="flex flex-col gap-2">
          <label class="text-sm">Description</label>
          <textarea
            v-model="form.description"
            class="w-full h-24 resize-none border border-gray-300 rounded"
          />
        </div>

        <div class="">
          <div class="flex items-center gap-2">
            <label class="text-sm mb-1 block">Add Member</label>
            <button
              @click="addMember"
              class="w-[35px] h-[35px] text-white text-lg flex items-center justify-center"
            >
              <img src="/more.png" alt="add" />
            </button>
          </div>
          <div>
            <div
              v-for="(input, index) in memberInputs"
              :key="index"
              class="flex items-center gap-2 mt-2"
            >
              <!-- ปุ่มเลือกรายชื่อ -->
              <div class="relative w-[200px]">
                <div
                  class="border border-gray-300 rounded px-2 py-1 text-sm flex items-center justify-between cursor-pointer"
                  @click="input.showDropdown = !input.showDropdown"
                >
                  <div v-if="input.user">
                    <img
                      :src="input.user.profile_pic || '/user.png'"
                      class="inline w-6 h-6 rounded-full"
                    />
                    {{ input.user.firstname }} {{ input.user.lastname }}
                  </div>
                  <div v-else class="text-gray-400">เลือกสมาชิก</div>
                  <span class="ml-2">&#9662;</span>
                </div>

                <div
                  v-if="input.showDropdown"
                  class="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded shadow"
                >
                  <div
                    v-for="user in users"
                    :key="user.id"
                    class="flex items-center px-3 py-2 hover:bg-gray-100 cursor-pointer"
                    @click="
                      () => {
                        input.user = user;
                        input.showDropdown = false;
                      }
                    "
                  >
                    <img
                      :src="user.profile_pic || '/user.png'"
                      class="w-6 h-6 rounded-full mr-2"
                    />
                    {{ user.firstname }} {{ user.lastname }}
                  </div>
                </div>
              </div>

              <!-- เลือกตำแหน่ง -->
              <div>
                <div
                  v-if="input.position === 'Other...'"
                  class="relative w-[170px]"
                >
                  <input
                    v-model="input.customPosition"
                    type="text"
                    placeholder="Enter position"
                    class="h-[35px] w-full border border-gray-300 rounded px-3 pr-7 py-2 text-[14px]"
                  />
                  <button
                    @click="
                      () => {
                        input.position = '';
                        input.customPosition = '';
                      }
                    "
                    class="absolute right-1 top-1/2 -translate-y-1/2 text-red-500 hover:text-red-700 text-sm"
                    title="ยกเลิก"
                  >
                    ✖
                  </button>
                </div>
                <select
                  v-else
                  v-model="input.position"
                  class="input h-[35px] border border-gray-300 rounded px-2 py-1 text-[14px] w-[170px]"
                >
                  <option disabled value="">Position</option>
                  <option>BA</option>
                  <option>UX/UI</option>
                  <option>Back-end</option>
                  <option>Front-end</option>
                  <option>Tester</option>
                  <option>Other...</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex justify-end gap-3 mt-6">
        <button
          @click="$emit('close')"
          class="px-4 py-1 bg-[#D1FAE5] text-black rounded"
        >
          Cancel
        </button>
        <button
          @click="submitForm"
          class="px-4 py-1 bg-[#10B981] text-white rounded"
        >
          Confirm
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router'
import axios from 'axios';

const token = ref(null);
const route = useRoute()
const projectId = route.params.id



</script>