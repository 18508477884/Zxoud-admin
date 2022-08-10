<template>
  <n-layout has-sider class="h-screen">
    <n-layout-sider
      class="aside bg-#001428"
      collapse-mode="width"
      :collapsed-width="64"
      :width="200"
      :native-scrollbar="false"
      :collapsed="app_store.collapsed"
    >
      <Menu></Menu>
    </n-layout-sider>
    <n-layout class="h-screen">
      <n-layout-header class="header"><Header></Header></n-layout-header>
      <n-layout-content
        class="main bg-gray-50 absolute inset-0 top-64px pt44px"
      >
        <router-view></router-view>
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>
<!--  @collapsed-open="collapsed = !collapsed" -->
<script lang="ts" setup>
import Header from './components/Header/index.vue';
import Menu from './components/Menu/index.vue';
import { appStore } from '@/store';
const app_store = appStore();
</script>

<style scoped>
:deep(.n-layout-sider .n-layout-toggle-button) {
  top: 240px;
}
</style>
