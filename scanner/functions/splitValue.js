function splitValue(filename, value, resourcePrefix, config, includeJson, needMd5) {
  var vStart = '';
  var vEnd = '';
  var extname = path.extname(value);
  if (value.indexOf('\"') === 0 || value.indexOf('\'') === 0) {
    vStart = value[0];
    vEnd = value[value.length - 1];
    value = value.replace(/^\"|\"$/g, '').replace(/^\'|\'$/g, '');
  }
  if (value === 'domain_prefix') {
    return vStart + resourcePrefix + Util.urlJoin(comboConf.server.shortPath) + vEnd;
  }
  if (Util.regexps.url.test(value)
    || value.length <= 0
    || value.indexOf('data:image') >= 0
    || (typeof extname === 'string' && extname.length === 0)
    || typeof extname !== 'string') {
    value = vStart + value + vEnd;
    return value;
  }
  var valueArr = value.split(',');
  valueArr = valueArr.map(function (item) {
    var valueItem = item;
    var moduleName = undefined;
    if (item.indexOf(':') >= 0) {
      item = item.split(':');
      moduleName = item[0];
      valueItem = item[1];
    }
    return transmitResource(filename, valueItem, moduleName, config, includeJson, needMd5);
  });
  if (valueArr.length > 1) {
    value = vStart + resourcePrefix + Util.urlJoin(comboConf.server.shortPath, comboConf.server.flag, valueArr.join(',')) + vEnd;
  } else {
    if (valueArr[0].indexOf('data:image') >= 0) {
      return valueArr[0];
    }
    value = vStart + resourcePrefix + Util.urlJoin(comboConf.server.shortPath, valueArr.join(',')) + vEnd;
  }
  return value;
}