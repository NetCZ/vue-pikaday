import camelCase from 'lodash/camelCase';

import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import progress from 'rollup-plugin-progress';
import { terser } from 'rollup-plugin-terser';
import { name } from '../package.json';

const debug = process.env.DEBUG === 'true';

export default {
  plugins: [
    progress(),
    resolve({ external: ['vue'] }),
    commonjs({
      include: 'node_modules/**'
    }),
    babel({
      babelrc: false,
      presets: [
        ['env', { 'modules': false }]
      ],
      exclude: 'node_modules/**',
      plugins: ['external-helpers']
    }),
    terser({
      compress: {
        drop_console: !debug,
        drop_debugger: !debug
      }
    })
  ],
  output: {
    format: 'umd',
    name: camelCase(name),
    sourcemap: 'inline'
  }
};
