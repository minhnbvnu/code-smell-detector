function getLocalResults(str) {
        var i, match, s, value,
            searchFields = scope.searchFields.split(','),
            matches = [];
        if (typeof scope.parseInput() !== 'undefined') {
          str = scope.parseInput()(str);
        }
        for (i = 0; i < scope.localData.length; i++) {
          match = false;

          for (s = 0; s < searchFields.length; s++) {
            value = extractValue(scope.localData[i], searchFields[s]) || '';
            match = match || (value.toString().toLowerCase().indexOf(str.toString().toLowerCase()) >= 0);
          }

          if (match) {
            matches[matches.length] = scope.localData[i];
          }
        }
        return matches;
      }