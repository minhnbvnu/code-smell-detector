function generateFileHtml (file, config, mapJson, dataJson) {
  var fileString = file.contents.toString();
  var filenameShort = path.basename(file.path);
  ViewHelper.tpl = filenameShort;
  ViewHelper.config = config;
  mapJson.dependency[filenameShort] = [];
  ViewHelper.mapJson = mapJson;
  ViewHelper.dataJson = dataJson;
  var ret = '';
  try {
    ret = _.template(fileString)(ViewHelper);
  } catch (e) {
    gutil.log(gutil.colors.red('页面 ' + ViewHelper.tpl + ' 存在语法错误！'));
    throw e;
  }
  return ret;
}