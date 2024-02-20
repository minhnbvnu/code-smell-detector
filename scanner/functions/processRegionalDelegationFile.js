function processRegionalDelegationFile(bufs, callback) {
  var content = Buffer.concat(bufs).toString();
  bufs.length = 0;
  var delegationsByCountry = {};
  for (var match; match = kDelegationEntryPattern.exec(content); ) {
    if (!delegationsByCountry[match[1]])
      delegationsByCountry[match[1]] = [];
    var maskLength = Prefix.getMaskLength(~(parseInt(match[3], 10) - 1));
    delegationsByCountry[match[1]].push(new Prefix(match[2], maskLength));
  }
  callback(null, delegationsByCountry);
}