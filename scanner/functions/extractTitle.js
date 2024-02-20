function extractTitle(data) {
        // split title fields and run extractValue for each and join with ' '
        return scope.titleField.split(',')
          .map(function(field) {
            return extractValue(data, field);
          })
          .join(' ');
      }