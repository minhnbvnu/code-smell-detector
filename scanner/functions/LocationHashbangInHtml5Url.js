function LocationHashbangInHtml5Url(appBase, appBaseNoFile, hashPrefix) {
  this.$$html5 = true;
  LocationHashbangUrl.apply(this, arguments);

  this.$$parseLinkUrl = function(url, relHref) {
    if (relHref && relHref[0] === '#') {
      // special case for links to hash fragments:
      // keep the old url and only replace the hash fragment
      this.hash(relHref.slice(1));
      return true;
    }

    var rewrittenUrl;
    var appUrl;

    if (appBase == stripHash(url)) {
      rewrittenUrl = url;
    } else if ((appUrl = beginsWith(appBaseNoFile, url))) {
      rewrittenUrl = appBase + hashPrefix + appUrl;
    } else if (appBaseNoFile === url + '/') {
      rewrittenUrl = appBaseNoFile;
    }
    if (rewrittenUrl) {
      this.$$parse(rewrittenUrl);
    }
    return !!rewrittenUrl;
  };

  this.$$compose = function() {
    var search = toKeyValue(this.$$search),
        hash = this.$$hash ? '#' + encodeUriSegment(this.$$hash) : '';

    this.$$url = encodePath(this.$$path) + (search ? '?' + search : '') + hash;
    // include hashPrefix in $$absUrl when $$url is empty so IE9 does not reload page because of removal of '#'
    this.$$absUrl = appBase + hashPrefix + this.$$url;
  };

}