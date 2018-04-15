var postcss = require('postcss')

module.exports = {
  // parser: file.extname === '.sss' ? 'sugarss' : false,
  plugins: {
    'postcss-import': {},
    'postcss-fontpath': {},
    'postcss-custom-media': {},
    'postcss-custom-properties': {},
    'postcss-calc': {},
    'postcss-color-function': {},
    'postcss-discard-comments': {},
    'autoprefixer': {},
    'cssnano': {
      preset: 'default',
  }
  },
  input: 'src/base.css',
  dir: 'dist'
}
