import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite'; //按需自动加载api
import Components from 'unplugin-vue-components/vite'; //按需自动加载组件
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers';
import Unocss from 'unocss/vite';
import { presetUno } from 'unocss';
import { resolve } from 'path';
import path from 'path';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';

// https://cn.vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: [
        'vue',
        {
          'naive-ui': [
            'useDialog',
            'useMessage',
            'useNotification',
            'useLoadingBar',
          ],
        },
      ],
      dts: 'types/auto-imports.d.ts', // 生成配置文件，如果是ts项目，通常我们会把声明文件放在根目录/types中，注意，这个文件夹需要先建好，否则可能导致等下无法往里生成auto-imports.d.ts文件
      eslintrc: {
        enabled: false, // 默认false, true启用。生成一次就可以，避免每次工程启动都生成，一旦生成配置文件之后，最好把enable关掉，即改成false。否则这个文件每次会在重新加载的时候重新生成，这会导致eslint有时会找不到这个文件。当需要更新配置文件的时候，再重新打开
        //filepath: './.eslintrc-auto-import.json', // 生成json文件,可以不配置该项，默认就是将生成在根目录
        globalsPropValue: true,
      },
    }),
    Components({
      resolvers: [NaiveUiResolver()],
      dts: 'types/components.d.ts',
    }),
    Unocss({
      presets: [presetUno()],
    }),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      // 指定symbolId格式
      symbolId: 'icon-[dir]-[name]',
    }),
  ],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: resolve(__dirname, './src'),
      },
    ],
  },
});
