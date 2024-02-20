function create_utc__createUTC (input, format, locale, strict) {
          return createLocalOrUTC(input, format, locale, strict, true).utc();
      }