function uiRouterVersion() { 
  var found = undefined;
  _.each(__karma__.files, function(file, key) {
    var matcher = /ui-router-versions\/(\d+)\.(\d+)\.(\d+)\/angular-ui-router.js/;
    if (!found) found = matcher.exec(key);
  });
  if (!found) return undefined;

  return (parseInt(found[1]) * 1000) + (parseInt(found[2]) * 100) + parseInt(found[3]);
}