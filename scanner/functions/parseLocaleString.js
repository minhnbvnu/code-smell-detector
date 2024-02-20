function parseLocaleString(localeStr) {
    // I really want to avoid writing a BCP 47 parser
    // see, e.g. https://github.com/wooorm/bcp-47
    // Instead, we'll do this:
    // a) if the string has no -u extensions, just leave it alone
    // b) if it does, use Intl to resolve everything
    // c) if Intl fails, try again without the -u
    var uIndex = localeStr.indexOf("-u-");

    if (uIndex === -1) {
      return [localeStr];
    } else {
      var options;
      var smaller = localeStr.substring(0, uIndex);

      try {
        options = getCachedDTF(localeStr).resolvedOptions();
      } catch (e) {
        options = getCachedDTF(smaller).resolvedOptions();
      }

      var _options = options,
          numberingSystem = _options.numberingSystem,
          calendar = _options.calendar; // return the smaller one so that we can append the calendar and numbering overrides to it

      return [smaller, numberingSystem, calendar];
    }
  }