<template>
  <n-config-provider
    :locale="zhCN"
    :date-locale="dateZhCN"
    :theme-overrides="themeOverrides"
  >
    <n-dialog-provider>
      <n-message-provider>
        <router-view />
      </n-message-provider>
    </n-dialog-provider>
  </n-config-provider>
</template>

<script setup lang="ts">
import { zhCN, dateZhCN } from 'naive-ui';
import { NConfigProvider, GlobalThemeOverrides } from 'naive-ui';
const themeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: '#2D8CF0',
    // primaryColorHover: '#2D8CF0',
    // primaryColorPressed: '#2D8CF0',
    // baseColor: '#2D8CF0',
    // primaryColorSuppl: '#2D8CF0',
    // infoColor: '#2D8CF0',
    // infoColorHover: '#2D8CF0',
  },
  Button: {
    // textColor: '#2D8CF0',
    // colorActive: '#2F0',
  },
  Menu: {
    // itemColorActiveCollapsed: '#2D8CF0',
    // itemColorActiveInverted: '#2D8CF0',
    // itemColorActive: '#2D8CF0',
    // itemColorActiveHover: '#2D8CF0',
    // itemTextColorActive: '#FFF',
    // itemIconColorActive: '#FFF',
    // itemTextColorActiveHover: '#FFF',
    // itemIconColorActiveHover: '#FFF',
    // itemIconColorChildActive: '#FFF',
    // itemTextColorChildActive: '#FFF',
    // arrowColorChildActive: '#FFF',
    // itemIconColorChildActiveHover: '#FFF',
    // itemTextColorChildActiveHover: '#FFF',
    // arrowColorChildActiveHover: '#FFF',
  },
};
</script>
