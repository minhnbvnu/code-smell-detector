function runPsi(url) {
  log('\nStarting PageSpeed Insights');
  psi.output(url).then(function (err) {
    process.exit(0);
  });
}