import camelCase from 'lodash/camelCase';

import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import { scope, name as nameWithScope } from '../package.json';

const name = nameWithScope.replace(`@${scope}/`, '');

const debug = process.env.DEBUG === 'true';

export default {
  plugins: [
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
