function sslSetup() {
  var sslPrompt = {
    type : 'confirm',
    default : false,
    name : 'sslContinue',
    message : "Enable SSL? This will let you mount this server from the https://bip.io dashboard"
  }

  prompt(sslPrompt, function(answer) {
    if (answer.sslContinue) {
      var targetDir = configDir + '/credentials',
        cmd = __dirname + '/gencert.sh ' + sparseConfig.domain + ' ' + targetDir;

      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, 0755);
      }

      if (0 === sh(cmd).status) {
        sparseConfig.proto_public = 'https://';
        sparseConfig.server.ssl.key = targetDir + '/server.key';
        sparseConfig.server.ssl.cert = targetDir + '/server.crt';
        corpusSyncSetup();
      } else {
        console.log('SSL Cert or Key generation failed');
        process.exit(0);
      }

    } else {
      corpusSyncSetup();
    }
  });
}