function parseStringifyInterceptor(value) {
        try {
          value = getValue(value);
          return allOrNothing && !isDefined(value) ? value : stringify(value);
        } catch (err) {
          $exceptionHandler($interpolateMinErr.interr(text, err));
        }
      }