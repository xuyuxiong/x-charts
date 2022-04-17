import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'lib/x-charts.js',
      format: 'cjs', // 对于Node.js 打包成commonjs
    },
    {
      file: 'esm/x-charts.js',
      format: 'es', // 对于浏览器 打包成ES module
    },
    {
      file: 'dist/x-charts.js',
      format: 'umd', // 对于Node.js和浏览器 打包成混合模式
    },
  ],
  plugins: [
    resolve(),
    babel(), // 使用babel插件
  ],
};
