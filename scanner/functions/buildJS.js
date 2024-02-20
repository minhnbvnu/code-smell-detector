function buildJS(options){
  if(typeof options=="undefined") options={};

  options=extend({
    minify:false,
    gsap:false,
  },options);

  var bundleStream=browserify('./src/main.js',{standalone:'ElasticProgress'});

  if(!options.gsap){
    bundleStream=bundleStream.ignore('gsap').ignore('jquery');
  }

  bundleStream=bundleStream
    .bundle()
    .on('error',function(e){
      console.log(e.message)
    })

  bundleStream
    .pipe(source('elastic-progress.js'))
    .pipe(gulp.dest('./dist/'))

  if(options.minify){
    bundleStream
      .pipe(source('elastic-progress.min.js'))
      .pipe(streamify(uglify()))
      .pipe(gulp.dest('./dist/'))
  }
}