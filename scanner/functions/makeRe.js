function makeRe(searchTerm) {
      return {
        begin: new RegExp('\\b' + searchTerm), // Begin matches word boundary
        baseName: new RegExp('\\b' + searchTerm + '[^/]*$'), // Begin matches word boundary of class / module name
        fullName: new RegExp('\\b' + searchTerm + '(?:[~.]|$)'), // Complete word(s) of class / module matches
        completeName: new RegExp('^' + searchTerm + '$') // Match from start to finish
      }
    }