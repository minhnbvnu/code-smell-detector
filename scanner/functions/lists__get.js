function lists__get (format, index, field, setter) {
          var locale = locale_locales__getLocale();
          var utc = create_utc__createUTC().set(setter, index);
          return locale[field](utc, format);
      }