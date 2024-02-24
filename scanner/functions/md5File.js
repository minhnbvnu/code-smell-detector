function md5File (filename, callback) {
  var sum = crypto.createHash('md5');
  if (callback && typeof callback === 'function') {
    var fileStream = fs.createReadStream(filename);
    fileStream.on('error', function (err) {
      return callback(err, null);
    });
    fileStream.on('data', function (chunk) {
      try {
        sum.update(chunk);
      } catch (ex) {
        return callback(ex, null);
      }
    });
    fileStream.on('end', function () {
      return callback(null, sum.digest('hex'));
    });
  } else {
    sum.update(fs.readFileSync(filename));
    return sum.digest('hex');
  }
}