<template>
  <div class="flex justify-between">
    <div class="flex items-center h64px">
      <svg-icon
        :name="app_store.collapsed ? 'expand' : 'shrink'"
        @click="app_store.collapsed = !app_store.collapsed"
      />
      <svg-icon name="refresh" />
      <n-breadcrumb>
        <n-breadcrumb-item>
          <n-dropdown :options="options1">
            <div class="trigger">北京总行I'm ok</div>
          </n-dropdown></n-breadcrumb-item
        >
        <n-breadcrumb-item
          ><n-dropdown :options="options2">
            <div class="trigger">天津分行'm ok</div>
          </n-dropdown></n-breadcrumb-item
        >
        <n-breadcrumb-item> 平山道支行</n-breadcrumb-item>
      </n-breadcrumb>
    </div>
    <div class="leading-64px" @click="$router.push('/login')">登录</div>
  </div>
  <div class="max-h44px fixed top-64px z-2">aaa</div>
</template>

<script setup lang="ts">
import { appStore } from '@/store';
const app_store = appStore();
const nameRef = ref(1);
const message = useMessage();
const panelsRef = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);
const panels = panelsRef;
const name = nameRef;
function handleClose(name: number) {
  const { value: panels } = panelsRef;
  if (panels.length === 1) {
    message.error('最后一个了');
    return;
  }
  message.info('关掉 ' + name);
  const index = panels.findIndex((v) => name === v);
  panels.splice(index, 1);
  if (nameRef.value === name) {
    nameRef.value = panels[index];
  }
}
//
const options1 = [
  {
    label: 'David Tao',
    key: 1,
  },
  {
    label: '黑色柳丁',
    key: 2,
  },
];
const options2 = [
  {
    label: '小镇姑娘',
    key: 1,
  },
  {
    label: '普通朋友',
    key: 2,
  },
];
</script>
<style scoped>
div a {
  position: fixed;
  z-index: 5;
  visibility: hidden;
  line-height: 40px;
}
</style>
