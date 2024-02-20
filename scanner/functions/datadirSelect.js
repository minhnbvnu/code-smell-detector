function datadirSelect() {
  var valDefault = (0 === sparseConfig.modules.cdn.config.data_dir.indexOf('/')
    ? sparseConfig.modules.cdn.config.data_dir
    : path.resolve(__dirname + "/../" + sparseConfig.modules.cdn.config.data_dir));

  var datadirSelect = {
    type : 'input',
    name : 'datadir',
    message : 'Data directory. default "' + valDefault + '" :'
  }

  prompt(datadirSelect, function(answer) {
    if ('' === answer.datadir) {
      answer.datadir = valDefault;
    }
    sparseConfig.modules.cdn.config.data_dir = path.resolve(answer.datadir);
    createDataDirs();
  });
}