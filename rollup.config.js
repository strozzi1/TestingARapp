import copy from 'rollup-plugin-copy-glob';
import { createDefaultConfig } from '@open-wc/building-rollup';

var config = createDefaultConfig({
  input: './index.html'
  // extension: ['.js', 'mjs']
});

export default {
  ...config,
  plugins: [
      copy([
        { files: 'src/style.css', dest: 'dist' },
        { files: 'models/*.*', dest: 'dist/models'}
      ], {verbose: false, watch: false}), ...config.plugins
  ]
};
