function hasAny(str, substrings) {
      for (var i = 0; i < substrings.length; i++)
        if (str.indexOf(substrings[i]) > -1)
          return true;
      return false;
    }