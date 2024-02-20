function ftp (opts) {
  opts = _.assign({}, opts);
  if (!opts.host) {
    throw new new gutil.PluginError('ftp', '`host` required');
  }
  var fileCount = 0;
  var remotePath = opts.remotePath || '';
	delete opts.remotePath;
  return through2.obj(function (file, encoding, callback) {
    if (file.isNull()) {
      return callback(null, file);
    }
    if (file.isStream()){
      return callback(null, file);
    }
    if (file.isBuffer()) {
      var jsFtp = new JSFtp(opts);
      var finalRemotePath = path.join('/', remotePath, file.relative).replace(/\\/g, '/');
      jsFtp.mkdirp(path.dirname(finalRemotePath).replace(/\\/g, '/'), function (err) {
        if (err) {
  				callback(new gutil.PluginError('ftp', err, {fileName: file.path}));
  				return;
  			}
        jsFtp.put(file.contents, finalRemotePath, function (err) {
  				if (err) {
  					callback(new gutil.PluginError('ftp', err, {fileName: file.path}));
  					return;
  				}

  				fileCount++;
  				jsFtp.raw.quit();
          gutil.log('ftp:', gutil.colors.green('✔ ') + file.relative);
          this.push(file);
          callback();
  			});
      });
    }
  }, function (callback) {
    if (fileCount > 0) {
			gutil.log('ftp:', gutil.colors.green(fileCount, '个文件上传成功！'));
		} else {
			gutil.log('ftp:', gutil.colors.yellow('没有文件上传！'));
		}
    callback();
  });
}