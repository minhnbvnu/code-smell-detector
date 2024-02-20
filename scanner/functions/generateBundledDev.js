function generateBundledDev() {
  return rollup
    .rollup({
      entry: 'index.js',
      external: [ 'vue' ],
      plugins: [
        replace({
          'process.env.NODE_ENV': '\'development\'',
        }),
      ],
    })
    .then(function(bundle) {
      return bundle.generate({
        format: 'iife',
        moduleName: 'VueClickaway',
        globals: { vue: 'Vue' },
      }).code;
    })
    .then(function(code) {
      write('dist/vue-clickaway.js', code);
    });
}