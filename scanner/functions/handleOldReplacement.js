function handleOldReplacement(replacement) {
        var result;
        if (!replacement) {
          result = noopFunc;
        } else if (replacement === "trueFunc") {
          result = trueFunc;
        } else if (replacement.includes("=")) {
          var isProp = replacement.startsWith("{") && replacement.endsWith("}");
          if (isProp) {
            var propertyPart = replacement.slice(1, -1);
            var propertyName = substringBefore(propertyPart, "=");
            var propertyValue = substringAfter(propertyPart, "=");
            if (propertyValue === "noopFunc") {
              result = {};
              result[propertyName] = noopFunc;
            }
          }
        }
        return result;
      }