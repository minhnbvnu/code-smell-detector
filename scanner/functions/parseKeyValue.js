function parseKeyValue(/**string*/keyValue) {
  var obj = {};
  forEach((keyValue || "").split('&'), function(keyValue) {
    var splitPoint, key, val;
    if (keyValue) {
      key = keyValue = keyValue.replace(/\+/g,'%20');
      splitPoint = keyValue.indexOf('=');
      if (splitPoint !== -1) {
        key = keyValue.substring(0, splitPoint);
        val = keyValue.substring(splitPoint + 1);
      }
      key = tryDecodeURIComponent(key);
      if (isDefined(key)) {
        val = isDefined(val) ? tryDecodeURIComponent(val) : true;
        if (!hasOwnProperty.call(obj, key)) {
          obj[key] = val;
        } else if (isArray(obj[key])) {
          obj[key].push(val);
        } else {
          obj[key] = [obj[key],val];
        }
      }
    }
  });
  return obj;
}