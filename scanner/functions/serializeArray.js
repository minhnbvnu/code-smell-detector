function serializeArray(value) {
      if (stack.indexOf(value) >= 0) {
        throw TypeError('Converting circular structure to JSON5');
      }

      stack.push(value);
      var stepback = indent;
      indent = indent + gap;
      var partial = [];

      for (var i = 0; i < value.length; i++) {
        var propertyString = serializeProperty(String(i), value);
        partial.push(propertyString !== undefined ? propertyString : 'null');
      }

      var final;

      if (partial.length === 0) {
        final = '[]';
      } else {
        if (gap === '') {
          var properties = partial.join(',');
          final = '[' + properties + ']';
        } else {
          var separator = ',\n' + indent;
          var properties$1 = partial.join(separator);
          final = '[\n' + indent + properties$1 + ',\n' + stepback + ']';
        }
      }

      stack.pop();
      indent = stepback;
      return final;
    }