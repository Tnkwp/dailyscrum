<template>
  <div class="min-h-screen bg-[#F0FDF4] p-6 font-noto pt-20">
    <div>
      <div>
        <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <!-- Add New Project -->
          <div
           @click="showModal = true"
            class="bg-white rounded-lg h-40 flex justify-center items-center shadow-md cursor-pointer"
          >
            <div class="text-center cursor-pointer">
              <div class="text-4xl font-bold">+</div>
              <div>Add Project Title</div>
            </div>
          </div>

          <!-- Project Card Component -->
          <ProjectCard
            v-for="(project, index) in projects"
            :key="index"
            v-bind="project"
          />
        </div>
        <ProjectFormModal
          v-if="showModal"
          @close="showModal = false"
          @submit="addProject"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import ProjectCard from "./ProjectCard.vue";
import ProjectFormModal from "../components/ProjectFormModal.vue";

const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

const showModal = ref(false);

const projects = ref([
  {
    title: "Project Title",
    status: "หยุดทำการ",
    start: "01/01/2024",
    end: "10/01/2024",
    owner: "นายเอ",
    members: ["👤", "👤", "👤"],
  },
  {
    title: "Project Title",
    status: "กำลังดำเนินการ",
    start: "05/01/2024",
    end: "20/01/2024",
    owner: "นายบี",
    members: ["👤", "👤"],
  },
]);

function addProject(newProject) {
  projects.value.push(newProject);
}
</script>

<style scoped></style>