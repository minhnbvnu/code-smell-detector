function $interpolate(text, mustHaveExpression, trustedContext, allOrNothing) {
      // Provide a quick exit and simplified result function for text with no interpolation
      if (!text.length || text.indexOf(startSymbol) === -1) {
        var constantInterp;
        if (!mustHaveExpression) {
          var unescapedText = unescapeText(text);
          constantInterp = valueFn(unescapedText);
          constantInterp.exp = text;
          constantInterp.expressions = [];
          constantInterp.$$watchDelegate = constantWatchDelegate;
        }
        return constantInterp;
      }

      allOrNothing = !!allOrNothing;
      var startIndex,
          endIndex,
          index = 0,
          expressions = [],
          parseFns = [],
          textLength = text.length,
          exp,
          concat = [],
          expressionPositions = [];

      while (index < textLength) {
        if (((startIndex = text.indexOf(startSymbol, index)) != -1) &&
             ((endIndex = text.indexOf(endSymbol, startIndex + startSymbolLength)) != -1)) {
          if (index !== startIndex) {
            concat.push(unescapeText(text.substring(index, startIndex)));
          }
          exp = text.substring(startIndex + startSymbolLength, endIndex);
          expressions.push(exp);
          parseFns.push($parse(exp, parseStringifyInterceptor));
          index = endIndex + endSymbolLength;
          expressionPositions.push(concat.length);
          concat.push('');
        } else {
          // we did not find an interpolation, so we have to add the remainder to the separators array
          if (index !== textLength) {
            concat.push(unescapeText(text.substring(index)));
          }
          break;
        }
      }

      // Concatenating expressions makes it hard to reason about whether some combination of
      // concatenated values are unsafe to use and could easily lead to XSS.  By requiring that a
      // single expression be used for iframe[src], object[src], etc., we ensure that the value
      // that's used is assigned or constructed by some JS code somewhere that is more testable or
      // make it obvious that you bound the value to some user controlled value.  This helps reduce
      // the load when auditing for XSS issues.
      if (trustedContext && concat.length > 1) {
          $interpolateMinErr.throwNoconcat(text);
      }

      if (!mustHaveExpression || expressions.length) {
        var compute = function(values) {
          for (var i = 0, ii = expressions.length; i < ii; i++) {
            if (allOrNothing && isUndefined(values[i])) return;
            concat[expressionPositions[i]] = values[i];
          }
          return concat.join('');
        };

        var getValue = function(value) {
          return trustedContext ?
            $sce.getTrusted(trustedContext, value) :
            $sce.valueOf(value);
        };

        return extend(function interpolationFn(context) {
            var i = 0;
            var ii = expressions.length;
            var values = new Array(ii);

            try {
              for (; i < ii; i++) {
                values[i] = parseFns[i](context);
              }

              return compute(values);
            } catch (err) {
              $exceptionHandler($interpolateMinErr.interr(text, err));
            }

          }, {
          // all of these properties are undocumented for now
          exp: text, //just for compatibility with regular watchers created via $watch
          expressions: expressions,
          $$watchDelegate: function(scope, listener) {
            var lastValue;
            return scope.$watchGroup(parseFns, function interpolateFnWatcher(values, oldValues) {
              var currValue = compute(values);
              if (isFunction(listener)) {
                listener.call(this, currValue, values !== oldValues ? lastValue : currValue, scope);
              }
              lastValue = currValue;
            });
          }
        });
      }

      function parseStringifyInterceptor(value) {
        try {
          value = getValue(value);
          return allOrNothing && !isDefined(value) ? value : stringify(value);
        } catch (err) {
          $exceptionHandler($interpolateMinErr.interr(text, err));
        }
      }
    }