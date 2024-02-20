function safe(str, col) {
      if (typeof str === "undefined" || str === null)
        return "";
      if (str.constructor === Date)
        return JSON.stringify(str).slice(1, 25);
      str = str.toString().replace(quoteCharRegex, _escapedQuote);
      var needsQuotes = typeof _quotes === "boolean" && _quotes || Array.isArray(_quotes) && _quotes[col] || hasAny(str, Papa.BAD_DELIMITERS) || str.indexOf(_delimiter) > -1 || str.charAt(0) === " " || str.charAt(str.length - 1) === " ";
      return needsQuotes ? _quoteChar + str + _quoteChar : str;
    }