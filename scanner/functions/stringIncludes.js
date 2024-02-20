function stringIncludes(str, search) {
        if (search.length > str.length) {
          return false;
        }

        return str.indexOf(search) !== -1;
    }