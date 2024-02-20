function loadWidget (widgetName, param, moduleName, onProcessContent, onProcessScript) {
  // 根据widgetName 和 module去寻找widget
  moduleName = moduleName ? moduleName : ViewHelper.config.module;
  widgetIndex++;
  var modulePath = path.join(ViewHelper.config.cwd, moduleName);
  var widgetPath = getWidgetPath(modulePath, widgetName);
  var widgetHtmlStr = '';
  var widgetItem = {
    widgetName: widgetName,
    module: moduleName,
    moduleId: require(path.join(modulePath, 'module-conf')).moduleId
  };
  //合并widgetName.json 中默认值
  var widgetJsonPath  = path.join(widgetPath, widgetName + '.json');
  var widgetJson = Util.readJsonFile(widgetJsonPath);
  var widgetJsonData = widgetJson.data || {};
  param = Object.assign(Object.create(widgetJsonData), param);

  var widgets = _.map(ViewHelper.mapJson.dependency[ViewHelper.tpl], 'widgetName');
  if (!ViewHelper.dataJson[widgetName]) {
    ViewHelper.dataJson[widgetName] = {
      module: moduleName,
      params: []
    };
  }
  if (!_.isEmpty(param)) {
    ViewHelper.dataJson[widgetName]['params'].push(param);
  }
  widgetItem.widgetType = 'widget';
  if (Util.existsSync(widgetPath)) {
    try {
      var tplPath = path.join(widgetPath, widgetName + '.html');
      if (Util.existsSync(tplPath)) {
        var widgetBuf = fs.readFileSync(tplPath);
        var widgetContent = String(widgetBuf);
        var htmlCommentReg = /<!--[\s\S\r\n\f]*?-->/g;
        var paramClone = Object.create(param);
        var widgetParam = Object.assign(paramClone, ViewHelper);
        widgetContent = widgetContent.replace(htmlCommentReg, function (m, $1) {
          if (m.indexOf('\n') >=0 && (m.indexOf('@author') >= 0 || m.indexOf('@description') >= 0)) {
            return '';
          }
          return m;
        });
        // 开始处理js片段
        var widgetStartLine = -1;
        var widgetEndLine = -1;
        var scriptContent = '';
        widgetContent = widgetContent.split('\n');
        widgetContent.forEach(function (item, i) {
          if (/widget.scriptStart/i.test(item)) {
            widgetStartLine = i;
          }

          if (/widget.scriptEnd/i.test(item)) {
            widgetEndLine = i;
          }
        });
        scriptContent = widgetContent.splice(widgetStartLine + 1, widgetEndLine - widgetStartLine - 1).join('\n');
        scriptContent = _.template(scriptContent)(paramClone);
        if (_.isFunction(onProcessScript)) {
          scriptContent = onProcessScript(scriptContent);
        }
        ScriptPool.add(widgetName, scriptContent);
        widgetHtmlStr = _.template(widgetContent.join('\n'))(widgetParam);
        if (_.isFunction(onProcessContent)) {
          widgetHtmlStr = onProcessContent(widgetPath, widgetHtmlStr, widgetItem);
        }
        if (_.isFunction(ViewHelper.config.onProcessTpl)) {
          widgetHtmlStr = ViewHelper.config.onProcessTpl(widgetHtmlStr);
        }
      }
    } catch (err) {
      gutil.log(gutil.colors.red('页面 ' + ViewHelper.tpl + ' 引用组件 ' + widgetName + ' 的模板中存在语法错误！'));
      throw err;
    }
    widgetItem.exists = true;
  } else {
    widgetItem.exists = false;
    gutil.log(gutil.colors.red(ViewHelper.tpl + ' widget ' + widgetName + ' can not find!'));
  }
  if (widgets.indexOf(widgetItem.widgetName) < 0) {
    ViewHelper.mapJson.dependency[ViewHelper.tpl].push(widgetItem);
  }
  return widgetHtmlStr;
}