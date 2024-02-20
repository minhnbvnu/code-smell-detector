function createDownloader(opts, cb) {
  getLatestRelease(function (err, ver) {
    if (err) {
      cb(err);
      return;
    }

    var url = WSK_ZIP_URL + ver.tag_name + '.zip';
    cb(null, new Download(opts).get(url), url, ver);
  });
}