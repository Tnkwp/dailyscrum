import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    username: "",
    token: "",
  }),
  getters: {
    isLoggedIn: (state) => !!state.token,
    getUsername: (state) => state.username,
  },
  actions: {
    setUser(username, token) {
      this.username = username;
      this.token = token;
    },
    logout() {
      this.username = "";
      this.token = "";
      localStorage.removeItem("token");
    },
  },
});