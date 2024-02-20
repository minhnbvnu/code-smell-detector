function generateSdk(apiDoc) {
  var sdk;
  try {
    sdk = fetchOpenApi(apiDoc, options);
    debug('sdk is\n' + sdk);
  } catch (e) {
    error(
      'Received the following error when generating the client: ' + e.message
    );
  }

  fs.writeFile(
    outputFilePath,
    sdk,
    errHandler(error, function () {
      msg('SDK written to ' + outputFilePath);
      exit(0);
    })
  );
}