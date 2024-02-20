function runKarma(done, singleRun){
  new karmaServer({
      configFile : __dirname +'/test/karma.conf.js',
      singleRun: singleRun
  }, done).start();
}