function locale_locales__getSetGlobalLocale (key, values) {
          var data;
          if (key) {
              if (typeof values === 'undefined') {
                  data = locale_locales__getLocale(key);
              }
              else {
                  data = defineLocale(key, values);
              }

              if (data) {
                  // moment.duration._locale = moment._locale = data;
                  globalLocale = data;
              }
          }

          return globalLocale._abbr;
      }