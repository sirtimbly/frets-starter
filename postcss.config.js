// var postcss = require('postcss')
const postcssPresetEnv = require('postcss-preset-env');
const cssnano = require("cssnano");
var atImport = require("postcss-import")

module.exports = {
  // parser: file.extname === '.sss' ? 'sugarss' : false,
  plugins: [
    atImport(),
    postcssPresetEnv({
      stage: 1,
      browsers: 'last 2 versions'
    }),
    // cssnano({
    //   preset: 'default',
    // })
  ],
  input: 'src/base.css',
  dir: 'dist'
}
