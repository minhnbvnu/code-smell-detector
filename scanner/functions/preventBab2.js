function preventBab2(source) {
      var script = document.currentScript;
      if (script === null) {
        return;
      }
      var url = script.src;
      if (typeof url !== 'string') {
        return;
      }
      var domainsStr = ['adclixx\\.net', 'adnetasia\\.com', 'adtrackers\\.net', 'bannertrack\\.net'].join('|');
      var matchStr = "^https?://[\\w-]+\\.(".concat(domainsStr, ")/.");
      var domainsRegex = new RegExp(matchStr);
      if (domainsRegex.test(url) === false) {
        return;
      }
      window.nH7eXzOsG = 858;
      hit(source);
    }