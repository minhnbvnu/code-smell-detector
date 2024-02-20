function keysToMatches(keys) {
        if (!keys) {
          return null;
        } else {
          var selectedKeys = {};
          for (var i = 0; i < keys.length; i++) {
            selectedKeys[keys[i]] = true;
          }
          var matches = {};
          for (var j = 0; j < key.length; j++) {
            if (selectedKeys[key[j]])
              matches[j] = true;
          }
          return matches;
        }
      }