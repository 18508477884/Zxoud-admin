import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import 'uno.css';
import svgIcon from '@/components/SvgIcon/index.vue';
import 'virtual:svg-icons-register';

createApp(App)
  .use(router)
  .use(createPinia())
  .component('svg-icon', svgIcon)
  .mount('#app');
