function compileGetter(exp) {
    if (improperKeywordsRE.test(exp)) {
      'development' !== 'production' && warn('Avoid using reserved keywords in expression: ' + exp);
    }
    // reset state
    saved.length = 0;
    // save strings and object literal keys
    var body = exp.replace(saveRE, save).replace(wsRE, '');
    // rewrite all paths
    // pad 1 space here becaue the regex matches 1 extra char
    body = (' ' + body).replace(identRE, rewrite).replace(restoreRE, restore);
    return makeGetterFn(body);
  }