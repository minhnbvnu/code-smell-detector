function startExpress(app) {

  const server = app.listen(serverPort, function () {
    console.log(`function compute app listening on port ${serverPort}!`);
    console.log();
  });

  registerSigintForExpress(server);
}