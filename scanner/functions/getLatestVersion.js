function getLatestVersion(id) {
  return new Promise((resolve, reject) => {
    var updateParams = {
      id: id,
      installsource: 'ondemand',
      uc: '',
    }
    // guess we're downloading it...
    var params = {
      prodversion: require('process').versions.chrome,
      x: querystring.stringify(updateParams)
    }
    var encodedParams = querystring.stringify(params);
    var updateUrl = (pjson.chrome && pjson.chrome.updateUrl) || 'https://clients2.google.com/service/update2/crx';
    var crxInfoUrl = `${updateUrl}?${encodedParams}`
    console.log(crxInfoUrl);

    var crxs = getCrxDir(id);
    mkdirp.sync(crxs);

    return fetch(crxInfoUrl)
    .then(res => {
      return res.text();
    })
    .then(text => {
      console.log('server version');
      console.log(text);
      var d = jq.parseXML(text);
      var updatecheck = jq(d).find('app[appid="' + id + '"]>updatecheck')[0];
      var updateResult = {
        codebase: updatecheck.getAttribute('codebase'),
        version: updatecheck.getAttribute('version'),
      };
      resolve(updateResult);
    });
  });
}