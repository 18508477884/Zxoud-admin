<template>
  <n-config-provider :theme="darkTheme">
    <div class="flex justify-center text-white">
      <img class="h50px p7px" src="@/assets/icons/zxoud.png" />
    </div>
    <n-menu
      :options="menuOptions"
      :collapsed-width="64"
      :collapsed-icon-size="20"
    />
  </n-config-provider>
</template>

<script setup lang="ts">
import { h, Component } from 'vue';
import { NIcon } from 'naive-ui';
import { darkTheme } from 'naive-ui';
import type { MenuOption } from 'naive-ui';
import { RouterLink } from 'vue-router';
import {
  FolderOutline,
  PersonOutline as PersonIcon,
  HomeOutline as HomeIcon,
} from '@vicons/ionicons5';
function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) });
}
const menuOptions: MenuOption[] = [
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: 'Dashboard',
          },
        },
        { default: () => '首页' },
      ),
    key: 'dashboard',
    icon: renderIcon(HomeIcon),
  },
  {
    label: '文件管理',
    key: 'file-menu',
    icon: renderIcon(FolderOutline),
    children: [
      {
        label: () =>
          h(
            RouterLink,
            {
              to: {
                name: 'Preview',
              },
            },
            { default: () => '预览' },
          ),
        key: 'preview',
      },
    ],
  },
];
</script>
