function domainSelect() {
  var valDefault = sparseConfig.domain;
  var domainSelect = {
    type : 'input',
    name : 'defaultDomain',
    message : 'Hostname (FQDN). default "' + valDefault + '" :'
  }

  prompt(domainSelect, function(answer) {
    if ('' === answer.defaultDomain) {
      answer.defaultDomain = valDefault;
    }
    sparseConfig.domain = answer.defaultDomain;
    portSelect();
  });
}