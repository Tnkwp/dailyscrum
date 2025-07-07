<template>
  <div class="bg-[#F0FDF4] min-h-screen">
    <div class="flex justify-center">
      <span class="text-[40px] font-noto mt-[60px]">Register</span>
    </div>
    <div
      class="mt-10 px-[406px] pt-[20px] mx-[250px] h-[750px] bg-[#F3F4F6] rounded-t-[26px] shadow-lg"
    >
      <div class="mt-[30px]">
        <div>
          <span class="text-[20px] font-noto">Firstname</span>
          <input
            type="text"
            class="w-full h-[40px] rounded-[10px] mt-[10px] px-2"
          />
        </div>
        <div class="mt-[10px]">
          <span class="text-[20px] font-noto">Lastname</span>
          <input
            type="text"
            class="w-full h-[40px] rounded-[10px] mt-[10px] px-2"
          />
        </div>
        <div class="mt-[10px]">
          <span class="text-[20px] font-noto">Email</span>
          <input
            type="text"
            class="w-full h-[40px] rounded-[10px] mt-[10px] px-2"
          />
        </div>
        <div class="mt-[10px]">
          <span class="text-[20px] font-noto">Password</span>
          <input
            type="text"
            class="w-full h-[40px] rounded-[10px] mt-[10px] px-2"
          />
        </div>
        <div class="mt-[10px]">
          <span class="text-[20px] font-noto">Confirm Password</span>
          <input
            type="text"
            class="w-full h-[40px] rounded-[10px] mt-[10px] px-2"
          />
        </div>
      </div>
      <div class="flex justify-center mt-[50px] gap-[141px]">
        <router-link to="/">
          <button
            class="h-[50px] w-[231px] bg-[#A40000] rounded-[10px] mt-[30px] text-white font-noto text-[20px]"
          >
            Cancel
          </button>
        </router-link>
        <button
          class="h-[50px] w-[231px] bg-[#2563EB] rounded-[10px] mt-[30px] text-white font-noto text-[20px]"
        >
          Register
        </button>
      </div>
    </div>
  </div>
</template>
<script setup></script>
