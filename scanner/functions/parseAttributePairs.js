function parseAttributePairs(input) {
        if (!input) {
          return [];
        }
        var NAME_VALUE_SEPARATOR = "=";
        var PAIRS_SEPARATOR = " ";
        var SINGLE_QUOTE = "'";
        var DOUBLE_QUOTE = '"';
        var BACKSLASH = "\\";
        var pairs = [];
        for (var i = 0; i < input.length; i += 1) {
          var name = "";
          var value = "";
          while (i < input.length && input[i] !== NAME_VALUE_SEPARATOR && input[i] !== PAIRS_SEPARATOR) {
            name += input[i];
            i += 1;
          }
          if (i < input.length && input[i] === NAME_VALUE_SEPARATOR) {
            i += 1;
            var quote = null;
            if (input[i] === SINGLE_QUOTE || input[i] === DOUBLE_QUOTE) {
              quote = input[i];
              i += 1;
              for (; i < input.length; i += 1) {
                if (input[i] === quote) {
                  if (input[i - 1] === BACKSLASH) {
                    value = "".concat(value.slice(0, -1)).concat(quote);
                  } else {
                    i += 1;
                    quote = null;
                    break;
                  }
                } else {
                  value += input[i];
                }
              }
              if (quote !== null) {
                throw new Error("Unbalanced quote for attribute value: '".concat(input, "'"));
              }
            } else {
              throw new Error('Attribute value should be quoted: "'.concat(input.slice(i), '"'));
            }
          }
          name = name.trim();
          value = value.trim();
          if (!name) {
            if (!value) {
              continue;
            }
            throw new Error("Attribute name before '=' should be specified: '".concat(input, "'"));
          }
          pairs.push({
            name: name,
            value: value
          });
          if (input[i] && input[i] !== PAIRS_SEPARATOR) {
            throw new Error("No space before attribute: '".concat(input.slice(i), "'"));
          }
        }
        return pairs;
      }