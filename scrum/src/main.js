import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "./router";
import { createPinia } from "pinia";
import GoogleLogin from "vue3-google-login";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(GoogleLogin, {
  clientId: "YOUR_GOOGLE_CLIENT_ID", // 👈 ใส่ client ID ที่คุณได้จาก Google
});
app.mount("#app");
