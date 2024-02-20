function getInlineStr (config, appConf, resId, type) {
  var inlineStr = '';
  var resPath = resId.replace('\/\/' + Util.urlJoin(config.domain, config.fdPath, config.app, '/'), '');
  var moduleName = resPath.split('/')[0];
  resPath = resPath.replace(moduleName, '');
  resPath = path.join(config.cwd, moduleName, 'dist', 'output', resPath);

  if (Util.existsSync(resPath)) {
    if (type === 'css') {
      inlineStr += '\n<style>';
      inlineStr += '/*filename=' + resId + '*/';
      inlineStr += String(fs.readFileSync(resPath));
      inlineStr += '</style>\n';
    } else if (type === 'js') {
      inlineStr += '\n<script>';
      inlineStr += '/*filename=' + resId + '*/';
      inlineStr += String(fs.readFileSync(resPath));
      inlineStr += '</script>\n';
    }
  } else {
    gutil.log(gutil.colors.red('生成页面片内联资源时，资源' + resPath + '没有找到！'));
  }
  return inlineStr;
}