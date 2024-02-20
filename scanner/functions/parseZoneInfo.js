function parseZoneInfo(ts, offsetFormat, locale, timeZone) {
    if (timeZone === void 0) {
      timeZone = null;
    }

    var date = new Date(ts),
        intlOpts = {
      hour12: false,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit"
    };

    if (timeZone) {
      intlOpts.timeZone = timeZone;
    }

    var modified = Object.assign({
      timeZoneName: offsetFormat
    }, intlOpts),
        intl = hasIntl();

    if (intl && hasFormatToParts()) {
      var parsed = new Intl.DateTimeFormat(locale, modified).formatToParts(date).find(function (m) {
        return m.type.toLowerCase() === "timezonename";
      });
      return parsed ? parsed.value : null;
    } else if (intl) {
      // this probably doesn't work for all locales
      var without = new Intl.DateTimeFormat(locale, intlOpts).format(date),
          included = new Intl.DateTimeFormat(locale, modified).format(date),
          diffed = included.substring(without.length),
          trimmed = diffed.replace(/^[, \u200e]+/, "");
      return trimmed;
    } else {
      return null;
    }
  }