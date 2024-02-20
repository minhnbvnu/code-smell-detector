function generateCommonModule() {
  return rollup
    .rollup({
      entry: 'index.js',
      external: [ 'vue' ],
    })
    .then(function(bundle) {
      return bundle.generate({
        format: 'cjs',
      }).code;
    })
    .then(function(code) {
      write('dist/vue-clickaway.common.js', code);
    });
}