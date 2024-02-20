function printLocalResource (filename, value, resourcePrefix, config, includeJson, fpath, content) {
  var res = '';
  if ((!path || !Util.existsSync(fpath)) && !content) {
    gutil.log(gutil.colors.red('文件' + value + '并不存在！'));
    return res;
  }
  if (fpath) {
    content = String(fs.readFileSync(fpath));
  }
  // 本地CSS
  if (Util.regexps.css.test(value)) {
    if (!Util.regexps.css.test(filename)) {
      res += '\n<style>\n';
      res += processCss(value, content, resourcePrefix, config, includeJson) + '\n';
      res += '</style>';
    } else {
      res += processCss(value, content, resourcePrefix, config, includeJson) + '\n';
    }
    return res;
  }
  // 本地JS
  if (Util.regexps.js.test(value)) {
    if (!Util.regexps.js.test(filename)) {
      res += '\n<script>\n';
      res += '/*filename=' + value + '*/\n';        
      res += processJs(value, content, resourcePrefix, config, includeJson) + '\n';
      res += '</script>';
    } else {
      res += processJs(value, content, resourcePrefix, config, includeJson) + '\n';
    }
    return res;
  }
  // 本地HTML
  if (Util.regexps.tpl.test(value)) {
    res += '\n<!--filename=' + value + '-->\n';
    res += processHtml(value, content, resourcePrefix, config, includeJson) + '\n';
    return res;
  }
  // 本地图片
  if (Util.regexps.images.test(value)) {
    var _pathname = fpath.split('?')[0];
    res += Util.transform2DataURI(_pathname);
    return res;
  }
  // 其他文件
  res += '\n' + content;
  return res;
}