function $ionicTemplateCache(templates) {
    if (typeof templates === 'undefined') {
      return run();
    }
    if (isString(templates)) {
      templates = [templates];
    }
    forEach(templates, function(template) {
      toCache.push(template);
    });
    if (hasRun) {
      run();
    }
  }