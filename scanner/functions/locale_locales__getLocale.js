function locale_locales__getLocale (key) {
          var locale;

          if (key && key._locale && key._locale._abbr) {
              key = key._locale._abbr;
          }

          if (!key) {
              return globalLocale;
          }

          if (!isArray(key)) {
              //short-circuit everything else
              locale = loadLocale(key);
              if (locale) {
                  return locale;
              }
              key = [key];
          }

          return chooseLocale(key);
      }