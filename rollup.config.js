import path from 'path';
import camelCase from 'lodash/camelCase';

import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import postcss from 'rollup-plugin-postcss';
import copy from 'rollup-plugin-copy';

import { peerDependencies, scope, name as nameWithScope } from './package.json';

const name = nameWithScope.replace(`@${ scope }/`, '');
const base = path.resolve(__dirname, './');
const src = path.resolve(base, 'src');
const dist = path.resolve(base, 'dist');
const debug = process.env.DEBUG === 'true';

const baseConfig = {
  input: path.resolve(src, 'index.js'),
  external: Object.keys(peerDependencies),
  plugins: [
    resolve({ external: ['vue'] }),
    babel({
      babelrc: false,
      presets: [
        ['@babel/preset-env', { 'modules': false }],
        '@babel/preset-flow'
      ],
      exclude: 'node_modules/**'
    }),
    commonjs(),
    postcss({
      extract: dist + '/vue-pikaday.min.css',
      minimize: true
    }),
    copy({
      targets: {
        'node_modules/pikaday/css/pikaday.css': dist + '/vue-pikaday.css'
      }
    }),
    terser({
      mangle: {
        reserved: ['Pikaday', 'moment']
      },
      compress: {
        drop_console: !debug,
        drop_debugger: !debug
      }
    })
  ]
};

export default [
  {
    ...baseConfig,
    output: {
      format: 'cjs',
      name: camelCase(name),
      file: path.resolve(dist, name + '.common.js'),
      sourcemap: true,
      globals: {
        moment: 'moment',
        pikaday: 'Pikaday'
      },
    },
  },
  {
    ...baseConfig,
    output: {
      format: 'umd',
      name: camelCase(name),
      file: path.resolve(dist, name + '.js'),
      sourcemap: true,
      globals: {
        moment: 'moment',
        pikaday: 'Pikaday',
        vue: 'vue'
      },
    }
  },
  {
    ...baseConfig,
    output: {
      format: 'es',
      file: path.resolve(dist, name + '.esm.js'),
      sourcemap: true
    }
  }
];
