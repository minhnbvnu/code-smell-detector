function cspSafeGetterFn(key0, key1, key2, key3, key4, fullExp, expensiveChecks) {
  ensureSafeMemberName(key0, fullExp);
  ensureSafeMemberName(key1, fullExp);
  ensureSafeMemberName(key2, fullExp);
  ensureSafeMemberName(key3, fullExp);
  ensureSafeMemberName(key4, fullExp);
  var eso = function(o) {
    return ensureSafeObject(o, fullExp);
  };
  var eso0 = (expensiveChecks || isPossiblyDangerousMemberName(key0)) ? eso : identity;
  var eso1 = (expensiveChecks || isPossiblyDangerousMemberName(key1)) ? eso : identity;
  var eso2 = (expensiveChecks || isPossiblyDangerousMemberName(key2)) ? eso : identity;
  var eso3 = (expensiveChecks || isPossiblyDangerousMemberName(key3)) ? eso : identity;
  var eso4 = (expensiveChecks || isPossiblyDangerousMemberName(key4)) ? eso : identity;

  return function cspSafeGetter(scope, locals) {
    var pathVal = (locals && locals.hasOwnProperty(key0)) ? locals : scope;

    if (pathVal == null) return pathVal;
    pathVal = eso0(pathVal[key0]);

    if (!key1) return pathVal;
    if (pathVal == null) return undefined;
    pathVal = eso1(pathVal[key1]);

    if (!key2) return pathVal;
    if (pathVal == null) return undefined;
    pathVal = eso2(pathVal[key2]);

    if (!key3) return pathVal;
    if (pathVal == null) return undefined;
    pathVal = eso3(pathVal[key3]);

    if (!key4) return pathVal;
    if (pathVal == null) return undefined;
    pathVal = eso4(pathVal[key4]);

    return pathVal;
  };
}