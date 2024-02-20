function l10nResourceLink(link) {
      var href = link.href;
      var type = link.type;
      this.load = function(lang, callback) {
        var applied = lang;
        parseResource(href, lang, callback, function() {
          consoleWarn(href + ' not found.');
          applied = '';
        });
        return applied; // return lang if found, an empty string if not found
      };
    }