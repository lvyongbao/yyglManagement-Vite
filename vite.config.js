/* eslint-disable import/no-extraneous-dependencies */
import { resolve } from 'path';
import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import vitePluginImp from 'vite-plugin-imp';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    reactRefresh(),
    vitePluginImp({
      libList: [
        {
          libName: 'antd',
          // style: (name) => `antd/lib/${name}/style/index.less`,
          // 有些组件是没有index.less
          style: (name) => `antd/es/${name}/style`,
        },
      ],
    }),
  ],
  css: {
    preprocessorOptions: {
      less: {
        // 支持内联 JavaScript
        javascriptEnabled: true,
        modifyVars: {
          '@primary-color': '#1890ff',
        },
      },
    },
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '~': resolve(__dirname, './'), // 根路径
      '@utils': resolve(__dirname, './src/utils'), // utils 路径
      '@public': resolve(__dirname, './src/public'), // public 路径
      '@components': resolve(__dirname, './src/components'), // components 路径
    },
  },
  optimizeDeps: {
    include: ['axios', 'antd', 'lodash'],
  },
  build: {
    // rollupOptions: {
    //   output: {
    //     manualChunks(id) {
    //       if (id.includes('node_modules')) {
    //         return id.toString().split('node_modules/')[1].split('/')[0].toString();
    //       }
    //     }
    //   }
    // },
    chunkSizeWarningLimit: 1000,
  },
});
