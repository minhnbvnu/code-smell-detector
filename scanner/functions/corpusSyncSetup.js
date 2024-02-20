function corpusSyncSetup() {
  var corpusPrompt = {
    type : 'confirm',
    default : sparseConfig.transforms.fetch,
    name : 'corpusSync',
    message : "Periodically fetch Community transforms from " + sparseConfig.transforms.syncFrom + '?'
  }

  prompt(corpusPrompt, function(answer) {
    sparseConfig.transforms.fetch = answer;
    userSetup();
  });
}