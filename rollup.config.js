import copy from 'rollup-plugin-copy-glob';
import { createDefaultConfig } from '@open-wc/building-rollup';

const config = createDefaultConfig({
  input: './index.html'
});

function workbox(config) {
  return {
    name: 'workbox',
    async writeBundle() {
      var build = require('workbox-build');
      const {count, size} = await build.generateSW(config);
      console.log(count, size);
    }
  }
}

export default {
  ...config,
  plugins: [
    copy([
      { files: 'style.css', dest: 'dist' },
      { files: 'models/*.glb', dest: 'dist/models/' },
    ], { verbose: false, watch: false }),
    ...config.plugins,
      workbox({
        globDirectory: "dist",
        // globPatterns: [
        //   '**/*.{js,css,html,glb,json}'
        // ],
        swDest: "dist/sw.js",
      }),
  ],
};
