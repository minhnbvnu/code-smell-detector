function setScript (fileContent) {
  var lines = fileContent.split('\n');
  var includeScriptEndPlaceHolder = -1;
  lines = lines.map(function (item, i) {
    if (/<!--[\s\S]?includeScriptEndPlaceHolder[\s\S]*?-->/g.test(item)) {
      includeScriptEndPlaceHolder = i;
      return '';
    }
    return item;
  });
  lines.splice(includeScriptEndPlaceHolder + 1, 0, ScriptPool.cache.map(function (line) {
    var reg = /<script\b[^>]*>([\s\S]*?)<\/script>/gm;
    line.script = line.script.replace(reg, function (m, $1) {
      if ($1.replace(Util.regexps.blank, '').length === 0) {
        return '';
      }
      return m;
    });
    return line.script;
  }).join(''));
  return lines.join('\n');
}