function fetchConfig(provider, cb) {
  var cfg = config(provider);

  if (!cfg) {
    cb(new Error('unknown provider: ' + provider));
    return;
  }

  request(cfg.url, function (err, res, body) {
    if (!err && res.statusCode !== 200) {
      err = new Error('config fetch error ' + res.statusCode);
    }

    cb(err, cfg, body);
  });
}