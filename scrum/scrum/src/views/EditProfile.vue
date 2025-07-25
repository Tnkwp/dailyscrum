<template>
  <div class="bg-[#F0FDF4] min-h-screen">
    <div class="flex justify-center">
      <span class="text-[32px] md:text-[40px] font-noto mt-[60px]"
        >Edit Profile</span
      >
    </div>
    <div
      class="mt-10 px-4 sm:px-10 lg:px-32 xl:px-60 pt-5 mx-auto max-w-5xl bg-[#F3F4F6] rounded-t-[26px] shadow-lg"
    >
      <div class="mt-6 space-y-4">
        <div class="flex flex-col items-center mb-6">
          <div class="relative">
            <!-- Profile Image Preview -->
            <img
              :src="form.profile_pic"
              class="w-24 h-24 rounded-full object-cover border border-gray-300"
            />

            <!-- Upload Button -->
            <label
              for="profile_pic"
              class="absolute bottom-0 right-0 p-1 rounded-full shadow cursor-pointer"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_767_4644)">
                  <path
                    d="M15.9599 4.79961L8.80493 11.9546C8.09243 12.6671 5.9774 12.9971 5.5049 12.5246C5.0324 12.0521 5.3549 9.93707 6.0674 9.22457L13.2299 2.06209C13.4066 1.86938 13.6204 1.71448 13.8586 1.6067C14.0967 1.49893 14.3543 1.4405 14.6156 1.435C14.8769 1.4295 15.1367 1.47701 15.3792 1.57466C15.6217 1.67232 15.8419 1.81812 16.0265 2.00322C16.211 2.18832 16.3562 2.4089 16.4532 2.65164C16.5502 2.89439 16.5971 3.15427 16.5908 3.41561C16.5846 3.67694 16.5254 3.93434 16.4171 4.1722C16.3086 4.41006 16.1531 4.6235 15.9599 4.79961Z"
                    stroke="black"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M8.25 3H4.5C3.70435 3 2.94133 3.31606 2.37872 3.87868C1.81612 4.44129 1.5 5.20435 1.5 6V13.5C1.5 14.2957 1.81612 15.0587 2.37872 15.6213C2.94133 16.1839 3.70435 16.5 4.5 16.5H12.75C14.4075 16.5 15 15.15 15 13.5V9.75"
                    stroke="black"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_767_4644">
                    <rect width="18" height="18" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </label>

            <!-- Hidden File Input -->
            <input
              id="profile_pic"
              type="file"
              @change="handleFileChange"
              class="hidden"
              accept="image/*"
            />
          </div>
        </div>
        <div>
          <span class="text-[18px] md:text-[20px] font-noto">Firstname</span>
          <input
            v-model="form.firstname"
            type="text"
            class="w-full h-[40px] rounded-[10px] mt-2 px-3"
          />
        </div>
        <div>
          <span class="text-[18px] md:text-[20px] font-noto">Lastname</span>
          <input
            v-model="form.lastname"
            type="text"
            class="w-full h-[40px] rounded-[10px] mt-2 px-3"
          />
        </div>
        <div>
          <span class="text-[18px] md:text-[20px] font-noto">Email</span>
          <input
            v-model="form.email"
            type="text"
            class="w-full h-[40px] rounded-[10px] mt-2 px-3 text-gray-500"
            readonly
          />
        </div>
      </div>
      <div
        class="flex flex-col md:flex-row justify-center md:justify-between mt-10 gap-4 pb-10"
      >
        <button
          @click="goBack"
          class="h-[50px] w-full md:w-[231px] bg-[#A40000] rounded-[10px] text-white font-noto text-[18px]"
        >
          Cancel
        </button>
        <button
          @click="updateProfile"
          class="h-[50px] w-full md:w-[231px] bg-[#2563EB] rounded-[10px] text-white font-noto text-[18px]"
        >
          confirm
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import Swal from "sweetalert2";

const router = useRouter();
const token = ref(null);
const form = ref({
  firstname: "",
  lastname: "",
  email: "",
  profile_pic: "",
  profile_pic_file: "",
});

// สมมติ URL backend ที่ดึงข้อมูล user ปัจจุบัน
const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

onMounted(async () => {
  token.value = localStorage.getItem("token");
  try {
    const response = await axios.get(`${backendUrl}/api/users/profile`, {
      headers: {
        Authorization: `Bearer ${token.value}`,
        "ngrok-skip-browser-warning": "true",
      },
      withCredentials: true,
    });
    const user = response.data.user;

    form.value.firstname = user.firstname;
    form.value.lastname = user.lastname;
    form.value.email = user.email;
    form.value.profile_pic = user.profile_pic;
  } catch (error) {
    console.error("Failed to load user profile:", error);
  }
});

const handleFileChange = (event) => {
  const file = event.target.files[0];

  if (!file) return;

  const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
  if (!allowedTypes.includes(file.type)) {
    alert("Invalid file type.");
    return;
  }

  const maxSize = 5 * 1024 * 1024; // 5MB
  if (file.size > maxSize) {
    alert("File size exceeds 5MB.");
    return;
  }

  // Revoke previous object URL if exists
  if (form.value.profile_pic && typeof form.value.profile_pic === "string") {
    URL.revokeObjectURL(form.value.profile_pic);
  }

  // Store file object separately (optional)
  form.value.profile_pic_file = file;

  // Create object URL for preview
  form.value.profile_pic = URL.createObjectURL(file);
};

function goBack() {
  window.history.back();
}

const updateProfile = async () => {
  const { firstname, lastname, profile_pic_file } = form.value;

  if (!firstname || !lastname) {
    Swal.fire("ข้อมูลไม่ครบ", "กรุณากรอกชื่อ-นามสกุล", "warning");
    return;
  }
  token.value = localStorage.getItem("token");
  try {
    const formData = new FormData();
    formData.append("firstname", firstname);
    formData.append("lastname", lastname);
    if (profile_pic_file) {
      formData.append("profile_pic", profile_pic_file); // ชื่อ key ควรตรงกับ backend
    }
    

    await axios.patch(`${backendUrl}/api/users/edit-profile`, formData, {
      headers: {
        Authorization: `Bearer ${token.value}`,
        "ngrok-skip-browser-warning": "true",
      },
      withCredentials: true,
    });

    console.log("Updated data:", {
      firstname,
      lastname,
      profile_pic_file,
    });

    Swal.fire("สำเร็จ", "อัปเดตข้อมูลเรียบร้อยแล้ว", "success");
    // router.back();
  } catch (err) {
    console.error("Update error:", err);
    Swal.fire(
      "เกิดข้อผิดพลาด",
      err.response?.data?.message || "ไม่สามารถอัปเดตข้อมูลได้",
      "error"
    );
  }
};
</script>
