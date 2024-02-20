function valid__createInvalid (flags) {
          var m = create_utc__createUTC(NaN);
          if (flags != null) {
              extend(getParsingFlags(m), flags);
          }
          else {
              getParsingFlags(m).userInvalidated = true;
          }

          return m;
      }