function generateBundledProd() {
  return rollup
    .rollup({
      entry: 'index.js',
      external: [ 'vue' ],
      plugins: [
        replace({
          'process.env.NODE_ENV': '\'production\'',
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
      return uglify.minify(code, {
        fromString: true,
      }).code;
    })
    .then(function(code) {
      return write('dist/vue-clickaway.min.js', code);
    }); 
}