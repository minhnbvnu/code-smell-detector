function createDateParser(regexp, mapping) {
  return function(iso, date) {
    var parts, map;

    if (isDate(iso)) {
      return iso;
    }

    if (isString(iso)) {
      // When a date is JSON'ified to wraps itself inside of an extra
      // set of double quotes. This makes the date parsing code unable
      // to match the date string and parse it as a date.
      if (iso.charAt(0) == '"' && iso.charAt(iso.length - 1) == '"') {
        iso = iso.substring(1, iso.length - 1);
      }
      if (ISO_DATE_REGEXP.test(iso)) {
        return new Date(iso);
      }
      regexp.lastIndex = 0;
      parts = regexp.exec(iso);

      if (parts) {
        parts.shift();
        if (date) {
          map = {
            yyyy: date.getFullYear(),
            MM: date.getMonth() + 1,
            dd: date.getDate(),
            HH: date.getHours(),
            mm: date.getMinutes(),
            ss: date.getSeconds(),
            sss: date.getMilliseconds() / 1000
          };
        } else {
          map = { yyyy: 1970, MM: 1, dd: 1, HH: 0, mm: 0, ss: 0, sss: 0 };
        }

        forEach(parts, function(part, index) {
          if (index < mapping.length) {
            map[mapping[index]] = +part;
          }
        });
        return new Date(map.yyyy, map.MM - 1, map.dd, map.HH, map.mm, map.ss || 0, map.sss * 1000 || 0);
      }
    }

    return NaN;
  };
}