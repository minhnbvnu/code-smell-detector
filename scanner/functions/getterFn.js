function getterFn(path, options, fullExp) {
  var expensiveChecks = options.expensiveChecks;
  var getterFnCache = (expensiveChecks ? getterFnCacheExpensive : getterFnCacheDefault);
  var fn = getterFnCache[path];
  if (fn) return fn;


  var pathKeys = path.split('.'),
      pathKeysLength = pathKeys.length;

  // http://jsperf.com/angularjs-parse-getter/6
  if (options.csp) {
    if (pathKeysLength < 6) {
      fn = cspSafeGetterFn(pathKeys[0], pathKeys[1], pathKeys[2], pathKeys[3], pathKeys[4], fullExp, expensiveChecks);
    } else {
      fn = function cspSafeGetter(scope, locals) {
        var i = 0, val;
        do {
          val = cspSafeGetterFn(pathKeys[i++], pathKeys[i++], pathKeys[i++], pathKeys[i++],
                                pathKeys[i++], fullExp, expensiveChecks)(scope, locals);

          locals = undefined; // clear after first iteration
          scope = val;
        } while (i < pathKeysLength);
        return val;
      };
    }
  } else {
    var code = '';
    if (expensiveChecks) {
      code += 's = eso(s, fe);\nl = eso(l, fe);\n';
    }
    var needsEnsureSafeObject = expensiveChecks;
    forEach(pathKeys, function(key, index) {
      ensureSafeMemberName(key, fullExp);
      var lookupJs = (index
                      // we simply dereference 's' on any .dot notation
                      ? 's'
                      // but if we are first then we check locals first, and if so read it first
                      : '((l&&l.hasOwnProperty("' + key + '"))?l:s)') + '.' + key;
      if (expensiveChecks || isPossiblyDangerousMemberName(key)) {
        lookupJs = 'eso(' + lookupJs + ', fe)';
        needsEnsureSafeObject = true;
      }
      code += 'if(s == null) return undefined;\n' +
              's=' + lookupJs + ';\n';
    });
    code += 'return s;';

    /* jshint -W054 */
    var evaledFnGetter = new Function('s', 'l', 'eso', 'fe', code); // s=scope, l=locals, eso=ensureSafeObject
    /* jshint +W054 */
    evaledFnGetter.toString = valueFn(code);
    if (needsEnsureSafeObject) {
      evaledFnGetter = getterFnWithEnsureSafeObject(evaledFnGetter, fullExp);
    }
    fn = evaledFnGetter;
  }

  fn.sharedGetter = true;
  fn.assign = function(self, value, locals) {
    return setter(self, locals, path, value, path);
  };
  getterFnCache[path] = fn;
  return fn;
}