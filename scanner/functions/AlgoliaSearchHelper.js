function AlgoliaSearchHelper(client, index, options) {
  if (!client.addAlgoliaAgent) console.log('Please upgrade to the newest version of the JS Client.'); // eslint-disable-line
  else if (!doesClientAgentContainsHelper(client)) client.addAlgoliaAgent('JS Helper ' + version);

  this.setClient(client);
  var opts = options || {};
  opts.index = index;
  this.state = SearchParameters.make(opts);
  this.lastResults = null;
  this._queryId = 0;
  this._lastQueryIdReceived = -1;
  this.derivedHelpers = [];
  this._currentNbQueries = 0;
}