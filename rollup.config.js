import copy from 'rollup-plugin-copy-glob';
import { createDefaultConfig } from '@open-wc/building-rollup';

var config = createDefaultConfig({
  input: './index.html'
  // extension: ['.js', 'mjs']
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
        { files: 'src/style.css', dest: 'dist' },
        { files: 'models/*.*', dest: 'dist/models'}
      ], {verbose: false, watch: false}),
      ...config.plugins,
      workbox({
        globDirectory: "dist",
        swDest: "dist/sw.js",
      }),
  ],
};
