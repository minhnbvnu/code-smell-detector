function getModuleName(commentsForFile) {
  var moduleName;
  commentsForFile.forEach(function(comment) {
    if (comment.type === 'Block') {
      var matches = comment.value.match(/@providesModule\s+(\S*)/);
      if (matches && matches[1]) {
        moduleName = matches[1];
      }
    }
  });
  return moduleName;
}