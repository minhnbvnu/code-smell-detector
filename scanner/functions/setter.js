function setter(obj, locals, path, setValue, fullExp) {
  ensureSafeObject(obj, fullExp);
  ensureSafeObject(locals, fullExp);

  var element = path.split('.'), key;
  for (var i = 0; element.length > 1; i++) {
    key = ensureSafeMemberName(element.shift(), fullExp);
    var propertyObj = (i === 0 && locals && locals[key]) || obj[key];
    if (!propertyObj) {
      propertyObj = {};
      obj[key] = propertyObj;
    }
    obj = ensureSafeObject(propertyObj, fullExp);
  }
  key = ensureSafeMemberName(element.shift(), fullExp);
  ensureSafeObject(obj[key], fullExp);
  obj[key] = setValue;
  return setValue;
}