function getWeightFunction(searchTerm, allowRegex) {
    function makeRe(searchTerm) {
      return {
        begin: new RegExp('\\b' + searchTerm), // Begin matches word boundary
        baseName: new RegExp('\\b' + searchTerm + '[^/]*$'), // Begin matches word boundary of class / module name
        fullName: new RegExp('\\b' + searchTerm + '(?:[~.]|$)'), // Complete word(s) of class / module matches
        completeName: new RegExp('^' + searchTerm + '$') // Match from start to finish
      }
    }
    const re = constructRegex(searchTerm, makeRe, allowRegex);
    return function (matchedItem, beginOnly) {
      // We could get smarter on the weight here
      const name = matchedItem.dataset.name;
      if (beginOnly) {
        return re.baseName.test(name) ? 100 : 1;
      }
      // If everything else is equal, prefer shorter names, and prefer classes over modules
      let weight = 10000 + matchedItem.dataset.longname.length - name.length * 100;
      if (re.begin.test(name)) {
        weight += 10000;
        if (re.baseName.test(name)) {
          weight += 10000;
          if (re.fullName.test(name)) {
            weight += 10000;
            if (re.completeName.test(name)) {
              weight += 10000;
            }
          }
        }
      }
      return weight;
    }
  }