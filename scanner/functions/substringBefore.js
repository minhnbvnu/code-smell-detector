function substringBefore(str, separator) {
        if (!str || !separator) {
          return str;
        }
        var index = str.indexOf(separator);
        return index < 0 ? str : str.substring(0, index);
      }