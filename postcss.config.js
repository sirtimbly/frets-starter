// var postcss = require('postcss')
const cssnano = require("cssnano");
const postcssPresetEnv = require('postcss-preset-env');
var atImport = require("postcss-import");
var purgecss = require("@fullhuman/postcss-purgecss");

var purgeFromFrets = require("purgecss-from-frets");

module.exports = {
  // parser: file.extname === '.sss' ? 'sugarss' : false,
  plugins: [
    atImport(),
    postcssPresetEnv({
      stage: 1,
      browsers: 'last 2 versions'
    }),
    purgecss({
      content: ['./src/components/**/*.ts'],
      extractors: [
        { extractor: purgeFromFrets, extensions: ["ts"] }
      ],
      whitelist: ['html', 'body', 'input', 'button', 'select'],
      whitelistPatterns: [/icon/, /green/, /fade/],
      rejected: true
    })
    // cssnano({
    //   preset: 'default',
    // })
  ],
  input: 'src/base.css',
  dir: 'dist'
}
