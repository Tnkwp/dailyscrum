import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    username: "",
    userProfile: null,
    isLoggedIn: false,
  }),
  actions: {
    login(username) {
      this.username = username;
      this.isLoggedIn = true;
    },
    loginWithGoogle(profile) {
      this.userProfile = profile;
      this.isLoggedIn = true;
    },
    logout() {
      this.username = "";
      this.userProfile = null;
      this.isLoggedIn = false;
    },
  },
});
