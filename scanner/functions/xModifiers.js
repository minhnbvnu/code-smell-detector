function xModifiers(modifiers) {
  var modifierQueue = modifiers.map(function (modifier) {
    return ModifiersMap[modifier];
  }).filter(Boolean);
  return function (e) {
    if (e && e.nativeEvent) {
      var brk = modifierQueue.some(function (fn) {
        return fn(e) === false;
      });

      if (brk) {
        return false;
      }
    }
  };
}