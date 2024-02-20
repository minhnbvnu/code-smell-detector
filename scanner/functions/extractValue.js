function extractValue(obj, key) {
        var keys, result;
        if (key) {
          keys= key.split('.');
          result = obj;
          for (var i = 0; i < keys.length; i++) {
            result = result[keys[i]];
          }
        }
        else {
          result = obj;
        }
        return result;
      }