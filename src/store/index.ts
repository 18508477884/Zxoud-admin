import { defineStore } from 'pinia';
export const appStore = defineStore('appStore', {
  state: () => {
    return {
      collapsed: false,
    };
  },
});
