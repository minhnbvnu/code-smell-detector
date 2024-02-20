function singleBuild(env){
  precompileTemplates(function() {
    createIndex(function() {
      build(env, function() {
        if (env.cleanup) cleanup();
      });
    });
  });
}