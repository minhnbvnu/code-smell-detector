function startTunnel(cb) {
  ngrok.connect(3000, function (err, url) {
    if (err) {
      log(chalk.red('\nERROR\n' + err));
      process.exit(0);
    }

    log('\nServing tunnel from: ' + chalk.magenta(url));
    cb(url);
  });
}