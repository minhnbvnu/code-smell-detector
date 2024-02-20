function serve(cb) {
  return server.listen(port, () => {
    console.info(`==> 🌎  ENV=${process.env.NODE_ENV}`);
    console.info(`==> ✅  Server is listening at http://localhost:${port}`);
    console.info(`==> 🎯  API at ${process.env.API_URL}`);
    Object.keys(config).forEach(
      key =>
        config[key].constructor.name !== 'Object' &&
        console.info(`==> ${key}`, config[key])
    );

    return cb && cb(this);
  });
}