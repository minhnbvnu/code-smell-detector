function watchBuild(env){
  message.notify('Watching build...');
  var jsPath = process.cwd() + '/' + config().jsPath;
  fsmonitor.watch(jsPath, PATHS, function(change){
    message.notify('Change detected: ' + change.toString().trim());
    singleBuild(env);
  });
}