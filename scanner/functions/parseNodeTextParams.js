function parseNodeTextParams(nodeName, textMatch) {
        var pattern = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
        var REGEXP_START_MARKER = "/";
        var isStringNameMatch = !(nodeName.startsWith(REGEXP_START_MARKER) && nodeName.endsWith(REGEXP_START_MARKER));
        var selector = isStringNameMatch ? nodeName : "*";
        var nodeNameMatch = isStringNameMatch ? nodeName : toRegExp(nodeName);
        var textContentMatch = !textMatch.startsWith(REGEXP_START_MARKER) ? textMatch : toRegExp(textMatch);
        var patternMatch;
        if (pattern) {
          patternMatch = !pattern.startsWith(REGEXP_START_MARKER) ? pattern : toRegExp(pattern);
        }
        return {
          selector: selector,
          nodeNameMatch: nodeNameMatch,
          textContentMatch: textContentMatch,
          patternMatch: patternMatch
        };
      }