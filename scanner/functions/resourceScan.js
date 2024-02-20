function resourceScan (opts) {
  var config = _.assign({
    cwd: undefined,
    module: undefined,
    useInclude: {},
    serve: false,
    useShtml: false
  }, opts);
  var fileMapJson = {
    dependency: {},
    include: {}
  };

  var dataJson = {};

  if (!config.cwd || !config.module) {
    gutil.log(gutil.colors.red('传入参数有误 at scan!'));
    return;
  }

  exludeResource = {
    js: [],
    css: []
  };
  var mapJsonPath = path.join(config.cwd, config.module, 'dist', 'map.json');

  if (fs.existsSync(mapJsonPath)) {
    fileMapJson = JSON.parse(fs.readFileSync(mapJsonPath).toString());
  }
  if (!config.serve && !_.isEmpty(config.useInclude.files)) {
    var useIncludeWidgetList = [];
    var includeFiles = config.useInclude.files;
    var fileChunk = {};
    try {
      fileChunk = JSON.parse(String(fs.readFileSync(path.join(config.cwd, '.' + config.useInclude.folder + '.json'))));
    } catch (e) {
      fileChunk = {};
    }
    config.folder = config.folder || 'include';
    for (var i in includeFiles) {
      var extname = path.extname(i);
      var scriptFile = path.basename(i, extname) + '_script' + extname;
      useIncludeWidgetList.push({
        file: i,
        widgetName: includeFiles[i].widget,
        module: includeFiles[i].module
      });
      if (!fileChunk[i] && !fileChunk[scriptFile]) {
        fileChunk[i] = {module: includeFiles[i].module};
        fileChunk[scriptFile] = {module: includeFiles[i].module};
      }
    }
    config.useInclude.useIncludeWidgetList = useIncludeWidgetList;
    config.useInclude.fileChunk = fileChunk;
  }
  var stream = through2.obj(function (file, encoding, callback) {
    ScriptPool.cache = [];
    if (file.isNull()) {
      return callback(null, file);
    }

    if (file.isBuffer()) {
      var fileString = generateFileHtml(file, config, fileMapJson, dataJson);
      fileString = setScript(fileString);
      file.contents = new Buffer(fileString);
      this.push(file);
      callback();
    } else if (file.isStream()){
      return callback(null, file);
    }
  }, function (callback) {
    widgetContentCache = {};
    var modulePath = path.join(config.cwd, config.module);
    var dest = path.join(modulePath, 'dist');
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest);
    }
    fs.writeFileSync(path.join(dest, 'map.json'), JSON.stringify(fileMapJson, null, 2));
    fs.writeFileSync(path.join(dest, 'data.json'), JSON.stringify(dataJson, null, 2));
    fs.writeFileSync(path.join(dest, '_exlude_resource.json'), JSON.stringify(exludeResource, null, 2));
    if (!config.serve && !_.isEmpty(config.useInclude.files)) {
      var useInclude = config.useInclude;
      var fileChunk = useInclude.fileChunk;
      if (useInclude.isGenerate) {
        fs.writeFileSync(path.join(config.cwd, '.' + useInclude.folder + '.json'), JSON.stringify(fileChunk, null, 2));
      }
    }
    callback();
  });
  return stream;
}