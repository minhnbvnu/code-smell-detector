function substringAfter(str, separator) {
        if (!str) {
          return str;
        }
        var index = str.indexOf(separator);
        return index < 0 ? "" : str.substring(index + separator.length);
      }