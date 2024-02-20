function portSelect() {
  var valDefault = sparseConfig.server.port;

  // if user has selected a hostname port, then use that
  var hostTokens = sparseConfig.domain.split(':'),
  port = Number(hostTokens.pop());

  if (!isNaN(port)) {
    valDefault = port;
  }

  var portSelect = {
    type : 'input',
    name : 'defaultPort',
    message : 'API TCP Port. default "' + valDefault + '" :'
  }

  prompt(portSelect, function(answer) {
    if ('' === answer.defaultPort) {
      answer.defaultPort = valDefault;
    }
    sparseConfig.server.port = answer.defaultPort;
    sparseConfig.domain_public = sparseConfig.domain + ':' + sparseConfig.server.port;
    datadirSelect();
  });
}