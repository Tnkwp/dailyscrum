<template>
  <div
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
  >
    <div
      class="bg-white rounded-lg p-6 w-full max-w-md shadow-xl relative font-noto"
    >
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

        <!-- Add Member Section -->
        <div>
          <div class="flex items-center gap-2">
            <label class="text-sm mb-1 block">Add Member</label>
            <!-- ปุ่ม + -->
            <button
              @click="addMember"
              class="w-[35px] h-[35px] text-white text-lg flex items-center justify-center"
            >
              <img src="/more.png" alt="add" />
            </button>

            
            <div class="relative w-[200px]">
              <div
                class="border border-gray-300 rounded px-2 py-1 text-sm flex items-center justify-between cursor-pointer"
                @click="toggleDropdown"
              >
                <div v-if="selectedUser">
                  <img
                    :src="selectedUser.profile_pic || '/user.png'"
                    class="inline w-6 h-6 rounded-full "
                  />
                  {{ selectedUser.firstname }} {{ selectedUser.lastname }}
                </div>
                <div v-else class="text-gray-400">เลือกสมาชิก</div>
                <span class="ml-2">&#9662;</span>
              </div>

              <div
                v-if="showDropdown"
                class="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded shadow w-[230px]"
              >
                <div
                  v-for="user in users"
                  :key="user.id"
                  class="flex items-center px-3 py-2 hover:bg-gray-100 cursor-pointer"
                  @click="selectUser(user)"
                >
                  <img
                    :src="user.profile_pic || '/user.png'"
                    class="w-6 h-6 rounded-full mr-2"
                  />
                  {{ user.firstname }} {{ user.lastname }}
                </div>
              </div>
            </div>

            <!-- Position Select หรือ Input -->
            <div class="flex-1">
              <div v-if="position === 'Other...'" class="relative w-[170px]">
                <input
                  v-model="customPosition"
                  type="text"
                  placeholder="Enter position"
                  class="h-[35px] w-full border border-gray-300 rounded px-3 pr-7 py-2 text-[14px]"
                />
                <!-- ปุ่มยกเลิกใน input -->
                <button
                  @click="cancelCustomPosition"
                  class="absolute right-1 top-1/2 -translate-y-1/2 text-red-500 hover:text-red-700 text-sm"
                  title="ยกเลิก"
                >
                  ✖
                </button>
              </div>
              <select
                v-else
                v-model="position"
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
import { ref, watch, onMounted } from "vue";
import axios from "axios";
import Swal from "sweetalert2";

const token = ref(null);
const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";
const users = ref([]);
const selectedUserId = ref("");
const form = ref({
  title: "",
  description: "",
  deadline_date: "",
  scrum_time: "",
});
const newMember = ref("");
const position = ref("");
const members = ref([]);
const customPosition = ref("");
const selectedUser = ref(null);
const showDropdown = ref(false);

const emit = defineEmits(["close", "submit"]);

function addMember() {
  if (newMember.value && (position.value || customPosition.value)) {
    const finalPosition =
      position.value === "Other..." ? customPosition.value : position.value;

    members.value.push({ name: newMember.value, role: finalPosition });

    newMember.value = "";
    position.value = "";
    customPosition.value = "";
  }
}

const submitForm = async () => {
  token.value = localStorage.getItem("token");
  if (!token.value) {
    Swal.fire("Error", "ไม่พบ token กรุณาเข้าสู่ระบบ", "error");
    return;
  }

  try {
    // สร้าง payload รวม form และ members
    const payload = {
      ...form.value,
      members: members.value,
    };

    const response = await axios.post(`${backendUrl}/api/projects`, payload, {
      headers: {
        Authorization: `Bearer ${token.value}`,
        "ngrok-skip-browser-warning": "true",
      },
      withCredentials: true,
    });

    Swal.fire("สำเร็จ", "สร้างโปรเจกต์เรียบร้อยแล้ว", "success");
    console.log("บันทึกสำเร็จ:", response.data);

    // รีเซ็ตฟอร์มและสมาชิก
    form.value.title = "";
    form.value.description = "";
    form.value.deadline_date = "";
    form.value.scrum_time = "";
    members.value = [];
  } catch (error) {
    Swal.fire(
      "เกิดข้อผิดพลาด",
      error.response?.data?.message || error.message,
      "error"
    );
  }
};

watch(position, (val) => {
  if (val !== "Other...") {
    customPosition.value = "";
  }
});

function cancelCustomPosition() {
  position.value = "";
  customPosition.value = "";
}

onMounted(async () => {
  token.value = localStorage.getItem("token");
  try {
    const res = await axios.get(`${backendUrl}/api/users/all`, {
      headers: {
        Authorization: `Bearer ${token.value}`,
        "ngrok-skip-browser-warning": "true",
      },
      withCredentials: true,
    });
    users.value = res.data.users || [];
  } catch (err) {
    console.error("ไม่สามารถโหลดรายชื่อผู้ใช้:", err);
  }
});

function toggleDropdown() {
  showDropdown.value = !showDropdown.value;
}

function selectUser(user) {
  selectedUserId.value = user.id;
  selectedUser.value = user;
  showDropdown.value = false;
}
</script>

<style scoped>
.input {
  @apply w-full h-[35px] border border-gray-300 rounded px-3 py-2 text-[14px];
}
</style>
